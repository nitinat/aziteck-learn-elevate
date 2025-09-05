import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/hooks/use-toast'
import { Upload, Save, Play, Trash2, Eye } from 'lucide-react'

interface InternshipBanner {
  id: string
  title: string
  subtitle: string
  video_url: string | null
  video_title: string
  video_description: string
  is_active: boolean
  display_order: number
}

export function InternshipProgramManager() {
  const [banners, setBanners] = useState<InternshipBanner[]>([])
  const [editingBanner, setEditingBanner] = useState<InternshipBanner | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchBanners()
  }, [])

  const fetchBanners = async () => {
    try {
      const { data, error } = await supabase
        .from('internship_program_banner')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) throw error
      setBanners(data || [])
    } catch (error) {
      console.error('Error fetching banners:', error)
      toast({
        title: "Error",
        description: "Failed to fetch banners",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleVideoUpload = async (file: File, bannerId: string) => {
    try {
      setIsUploading(true)
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `internship-program/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('program-videos')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('program-videos')
        .getPublicUrl(filePath)

      // Update banner with video URL
      const { error: updateError } = await supabase
        .from('internship_program_banner')
        .update({ video_url: publicUrl })
        .eq('id', bannerId)

      if (updateError) throw updateError

      toast({
        title: "Success",
        description: "Video uploaded successfully",
      })

      fetchBanners()
    } catch (error) {
      console.error('Error uploading video:', error)
      toast({
        title: "Error",
        description: "Failed to upload video",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const saveBanner = async (banner: InternshipBanner) => {
    try {
      const { error } = await supabase
        .from('internship_program_banner')
        .update({
          title: banner.title,
          subtitle: banner.subtitle,
          video_title: banner.video_title,
          video_description: banner.video_description,
          is_active: banner.is_active,
          display_order: banner.display_order
        })
        .eq('id', banner.id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Banner updated successfully",
      })

      setEditingBanner(null)
      fetchBanners()
    } catch (error) {
      console.error('Error saving banner:', error)
      toast({
        title: "Error",
        description: "Failed to save banner",
        variant: "destructive",
      })
    }
  }

  const deleteBanner = async (id: string) => {
    try {
      const { error } = await supabase
        .from('internship_program_banner')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Banner deleted successfully",
      })

      fetchBanners()
    } catch (error) {
      console.error('Error deleting banner:', error)
      toast({
        title: "Error",
        description: "Failed to delete banner",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Internship Program Banner</h2>
          <p className="text-muted-foreground">Manage the internship program marketing banner</p>
        </div>
      </div>

      {banners.map((banner) => (
        <Card key={banner.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {banner.title}
                  {banner.is_active && <Eye className="w-4 h-4 text-green-500" />}
                </CardTitle>
                <CardDescription>Display Order: {banner.display_order}</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingBanner(banner)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteBanner(banner.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Content</h4>
                <p className="text-sm text-muted-foreground mb-2">{banner.subtitle}</p>
                <p className="text-sm"><strong>Video Title:</strong> {banner.video_title}</p>
                <p className="text-sm"><strong>Video Description:</strong> {banner.video_description}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Video</h4>
                {banner.video_url ? (
                  <div className="space-y-2">
                    <video 
                      src={banner.video_url} 
                      controls 
                      className="w-full max-h-48 rounded-lg"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById(`video-upload-${banner.id}`)?.click()}
                      disabled={isUploading}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Replace Video
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Play className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">No video uploaded</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById(`video-upload-${banner.id}`)?.click()}
                      disabled={isUploading}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Video
                    </Button>
                  </div>
                )}
                <input
                  id={`video-upload-${banner.id}`}
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleVideoUpload(file, banner.id)
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {editingBanner && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Banner</CardTitle>
            <CardDescription>Update banner content and settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editingBanner.title}
                  onChange={(e) => setEditingBanner({...editingBanner, title: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="display-order">Display Order</Label>
                <Input
                  id="display-order"
                  type="number"
                  value={editingBanner.display_order}
                  onChange={(e) => setEditingBanner({...editingBanner, display_order: parseInt(e.target.value)})}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Textarea
                id="subtitle"
                value={editingBanner.subtitle}
                onChange={(e) => setEditingBanner({...editingBanner, subtitle: e.target.value})}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="video-title">Video Title</Label>
                <Input
                  id="video-title"
                  value={editingBanner.video_title}
                  onChange={(e) => setEditingBanner({...editingBanner, video_title: e.target.value})}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is-active"
                  checked={editingBanner.is_active}
                  onCheckedChange={(checked) => setEditingBanner({...editingBanner, is_active: checked})}
                />
                <Label htmlFor="is-active">Active</Label>
              </div>
            </div>

            <div>
              <Label htmlFor="video-description">Video Description</Label>
              <Textarea
                id="video-description"
                value={editingBanner.video_description}
                onChange={(e) => setEditingBanner({...editingBanner, video_description: e.target.value})}
                rows={3}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={() => saveBanner(editingBanner)}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setEditingBanner(null)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
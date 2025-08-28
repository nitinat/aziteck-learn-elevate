import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, Video, Save, X, Upload, Image, FileText, Presentation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface DemoVideo {
  id: string
  title: string
  description: string | null
  category: string
  technologies: string[]
  features: string[]
  video_url: string | null
  demo_url: string | null
  code_url: string | null
  image_url: string | null
  is_featured: boolean
  display_order: number
  created_at: string
  updated_at: string
}

interface DemoVideoForm {
  title: string
  description: string
  category: string
  technologies: string
  features: string
  video_url: string
  demo_url: string
  code_url: string
  image_url: string
  gif_url: string
  slides_url: string
  additional_media: string
  media_type: string
  is_featured: boolean
  display_order: number
}

export default function DemoVideoManager() {
  const [demos, setDemos] = useState<DemoVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState<DemoVideoForm>({
    title: "",
    description: "",
    category: "",
    technologies: "",
    features: "",
    video_url: "",
    demo_url: "",
    code_url: "",
    image_url: "",
    gif_url: "",
    slides_url: "",
    additional_media: "",
    media_type: "video",
    is_featured: false,
    display_order: 0
  })

  const [uploading, setUploading] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<{ [key: string]: File | null }>({
    image: null,
    video: null,
    gif: null,
    slides: null
  })

  const categories = [
    "Data Analysis",
    "Data Engineering", 
    "Data Science",
    "Machine Learning",
    "Full Stack Development",
    "Python Development",
    "Database & SQL",
    "Deployment & DevOps",
    "Business Intelligence",
    "Education Technology", 
    "Enterprise Software",
    "Artificial Intelligence",
    "Supply Chain",
    "Natural Language Processing"
  ]

  const mediaTypes = [
    { value: "video", label: "Video Demo", icon: Video },
    { value: "image", label: "Image Gallery", icon: Image },
    { value: "slides", label: "Animated Slides", icon: Presentation },
    { value: "gif", label: "GIF Animation", icon: FileText }
  ]

  useEffect(() => {
    fetchDemos()
  }, [])

  const fetchDemos = async () => {
    try {
      const { data, error } = await supabase
        .from('demo_videos')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) throw error
      setDemos(data || [])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load demo videos",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const uploadFile = async (file: File, path: string): Promise<string> => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `${path}/${fileName}`

    const { error } = await supabase.storage
      .from('learning-materials')
      .upload(filePath, file)

    if (error) throw error

    const { data } = supabase.storage
      .from('learning-materials')
      .getPublicUrl(filePath)

    return data.publicUrl
  }

  const handleFileUpload = async (type: string, file: File) => {
    setUploading(true)
    try {
      const url = await uploadFile(file, `demos/${type}`)
      
      switch (type) {
        case 'image':
          setFormData(prev => ({ ...prev, image_url: url }))
          break
        case 'gif':
          setFormData(prev => ({ ...prev, gif_url: url }))
          break
        case 'slides':
          setFormData(prev => ({ ...prev, slides_url: url }))
          break
        case 'video':
          setFormData(prev => ({ ...prev, video_url: url }))
          break
      }
      
      toast({ title: "Success", description: `${type} uploaded successfully` })
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to upload ${type}`,
        variant: "destructive"
      })
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Upload any selected files first
    for (const [type, file] of Object.entries(selectedFiles)) {
      if (file) {
        await handleFileUpload(type, file)
      }
    }
    
    const demoData = {
      ...formData,
      technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
      features: formData.features.split(',').map(f => f.trim()).filter(Boolean),
      created_by: (await supabase.auth.getUser()).data.user?.id
    }

    try {
      if (editingId) {
        const { error } = await supabase
          .from('demo_videos')
          .update(demoData)
          .eq('id', editingId)

        if (error) throw error
        toast({ title: "Success", description: "Demo updated successfully" })
      } else {
        const { error } = await supabase
          .from('demo_videos')
          .insert([demoData])

        if (error) throw error
        toast({ title: "Success", description: "Demo created successfully" })
      }

      resetForm()
      fetchDemos()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save demo",
        variant: "destructive"
      })
    }
  }

  const handleEdit = (demo: DemoVideo) => {
    setFormData({
      title: demo.title,
      description: demo.description || "",
      category: demo.category,
      technologies: demo.technologies.join(', '),
      features: demo.features.join(', '),
      video_url: demo.video_url || "",
      demo_url: demo.demo_url || "",
      code_url: demo.code_url || "",
      image_url: demo.image_url || "",
      gif_url: "",
      slides_url: "",
      additional_media: "",
      media_type: demo.video_url ? "video" : demo.image_url ? "image" : "video",
      is_featured: demo.is_featured,
      display_order: demo.display_order
    })
    setEditingId(demo.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this demo video?')) return

    try {
      const { error } = await supabase
        .from('demo_videos')
        .delete()
        .eq('id', id)

      if (error) throw error
      toast({ title: "Success", description: "Demo video deleted successfully" })
      fetchDemos()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete demo video",
        variant: "destructive"
      })
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      technologies: "",
      features: "",
      video_url: "",
      demo_url: "",
      code_url: "",
      image_url: "",
      gif_url: "",
      slides_url: "",
      additional_media: "",
      media_type: "video",
      is_featured: false,
      display_order: 0
    })
    setSelectedFiles({
      image: null,
      video: null,
      gif: null,
      slides: null
    })
    setEditingId(null)
    setShowForm(false)
  }

  if (loading) {
    return <div>Loading demo videos...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Demo Management</h2>
        <Button onClick={() => setShowForm(true)} className="btn-hero">
          <Plus className="w-4 h-4 mr-2" />
          Add Demo
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{editingId ? 'Edit' : 'Add'} Demo</span>
              <Button variant="ghost" size="sm" onClick={resetForm}>
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="technologies">Technologies (comma separated)</Label>
                  <Input
                    id="technologies"
                    value={formData.technologies}
                    onChange={(e) => setFormData(prev => ({ ...prev, technologies: e.target.value }))}
                    placeholder="React, Node.js, PostgreSQL"
                  />
                </div>
                <div>
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="features">Features (comma separated)</Label>
                <Textarea
                  id="features"
                  value={formData.features}
                  onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
                  placeholder="Feature 1, Feature 2, Feature 3"
                  rows={2}
                />
              </div>

              {/* Media Type Selection */}
              <div>
                <Label>Demo Type</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                  {mediaTypes.map((type) => {
                    const IconComponent = type.icon
                    return (
                      <Button
                        key={type.value}
                        type="button"
                        variant={formData.media_type === type.value ? "default" : "outline"}
                        className="h-auto p-3 flex-col gap-2"
                        onClick={() => setFormData(prev => ({ ...prev, media_type: type.value }))}
                      >
                        <IconComponent className="w-4 h-4" />
                        <span className="text-xs">{type.label}</span>
                      </Button>
                    )
                  })}
                </div>
              </div>

              {/* Media Upload Tabs */}
              <Tabs defaultValue="urls" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="urls">URLs</TabsTrigger>
                  <TabsTrigger value="upload">File Upload</TabsTrigger>
                </TabsList>
                
                <TabsContent value="urls" className="space-y-4">

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="video_url">Video URL</Label>
                      <Input
                        id="video_url"
                        value={formData.video_url}
                        onChange={(e) => setFormData(prev => ({ ...prev, video_url: e.target.value }))}
                        placeholder="https://youtube.com/..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="image_url">Image URL</Label>
                      <Input
                        id="image_url"
                        value={formData.image_url}
                        onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="gif_url">GIF URL</Label>
                      <Input
                        id="gif_url"
                        value={formData.gif_url}
                        onChange={(e) => setFormData(prev => ({ ...prev, gif_url: e.target.value }))}
                        placeholder="https://example.com/animation.gif"
                      />
                    </div>
                    <div>
                      <Label htmlFor="slides_url">Slides URL</Label>
                      <Input
                        id="slides_url"
                        value={formData.slides_url}
                        onChange={(e) => setFormData(prev => ({ ...prev, slides_url: e.target.value }))}
                        placeholder="https://slides.com/..."
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="upload" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(selectedFiles).map(([type, file]) => (
                      <div key={type} className="space-y-2">
                        <Label htmlFor={`${type}_file`}>
                          {type.charAt(0).toUpperCase() + type.slice(1)} File
                        </Label>
                        <div className="flex gap-2">
                          <Input
                            id={`${type}_file`}
                            type="file"
                            accept={type === 'video' ? 'video/*' : type === 'gif' ? '.gif' : 'image/*'}
                            onChange={(e) => {
                              const selectedFile = e.target.files?.[0] || null
                              setSelectedFiles(prev => ({ ...prev, [type]: selectedFile }))
                            }}
                            className="flex-1"
                          />
                          {file && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => handleFileUpload(type, file)}
                              disabled={uploading}
                            >
                              <Upload className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        {file && <p className="text-sm text-muted-foreground">{file.name}</p>}
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="demo_url">Demo URL</Label>
                  <Input
                    id="demo_url"
                    value={formData.demo_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, demo_url: e.target.value }))}
                    placeholder="https://demo.example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="code_url">Code URL</Label>
                  <Input
                    id="code_url"
                    value={formData.code_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, code_url: e.target.value }))}
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked }))}
                />
                <Label htmlFor="is_featured">Featured Demo</Label>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="btn-hero" disabled={uploading}>
                  <Save className="w-4 h-4 mr-2" />
                  {uploading ? 'Uploading...' : editingId ? 'Update' : 'Create'} Demo
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {demos.map((demo) => (
          <Card key={demo.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold">{demo.title}</h3>
                    {demo.is_featured && <Badge variant="default">Featured</Badge>}
                    <Badge variant="outline">{demo.category}</Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-3">{demo.description}</p>
                  
                  {demo.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {demo.technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <div className="text-sm text-muted-foreground">
                    Display Order: {demo.display_order}
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    {demo.video_url && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={demo.video_url} target="_blank" rel="noopener noreferrer">
                          <Video className="w-4 h-4 mr-1" />
                          Video
                        </a>
                      </Button>
                    )}
                    {demo.demo_url && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={demo.demo_url} target="_blank" rel="noopener noreferrer">
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {demo.code_url && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={demo.code_url} target="_blank" rel="noopener noreferrer">
                          Code
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(demo)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(demo.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {demos.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">No demos found. Create your first demo!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
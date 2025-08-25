import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, Video, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
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
    is_featured: false,
    display_order: 0
  })

  const categories = [
    "Business Intelligence",
    "Education Technology", 
    "Enterprise Software",
    "Artificial Intelligence",
    "Supply Chain",
    "Natural Language Processing"
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
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
        toast({ title: "Success", description: "Demo video updated successfully" })
      } else {
        const { error } = await supabase
          .from('demo_videos')
          .insert([demoData])

        if (error) throw error
        toast({ title: "Success", description: "Demo video created successfully" })
      }

      resetForm()
      fetchDemos()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save demo video",
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
      is_featured: false,
      display_order: 0
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
        <h2 className="text-3xl font-bold">Demo Videos Management</h2>
        <Button onClick={() => setShowForm(true)} className="btn-hero">
          <Plus className="w-4 h-4 mr-2" />
          Add Demo Video
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{editingId ? 'Edit' : 'Add'} Demo Video</span>
              <Button variant="ghost" size="sm" onClick={resetForm}>
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <Button type="submit" className="btn-hero">
                  <Save className="w-4 h-4 mr-2" />
                  {editingId ? 'Update' : 'Create'} Demo Video
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
              <p className="text-muted-foreground">No demo videos found. Create your first demo video!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
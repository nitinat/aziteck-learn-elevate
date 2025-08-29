import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit2, Trash2, Save, X, GripVertical } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

interface TeamMember {
  id: string
  name: string
  role: string
  experience: string
  description: string
  display_order: number
  is_active: boolean
}

interface TeamMemberEditorProps {
  isAdmin: boolean
}

export default function TeamMemberEditor({ isAdmin }: TeamMemberEditorProps) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    experience: '',
    description: ''
  })

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })

      if (error) throw error
      setTeamMembers(data || [])
    } catch (error) {
      console.error('Error fetching team members:', error)
      toast({
        title: "Error",
        description: "Failed to load team members",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      if (editingId) {
        const { error } = await supabase
          .from('team_members')
          .update(formData)
          .eq('id', editingId)

        if (error) throw error
        toast({ title: "Success", description: "Team member updated successfully" })
      } else {
        const maxOrder = Math.max(...teamMembers.map(m => m.display_order), 0)
        const { error } = await supabase
          .from('team_members')
          .insert({
            ...formData,
            display_order: maxOrder + 1
          })

        if (error) throw error
        toast({ title: "Success", description: "Team member added successfully" })
      }

      setEditingId(null)
      setAdding(false)
      setFormData({ name: '', role: '', experience: '', description: '' })
      fetchTeamMembers()
    } catch (error) {
      console.error('Error saving team member:', error)
      toast({
        title: "Error",
        description: "Failed to save team member",
        variant: "destructive"
      })
    }
  }

  const handleEdit = (member: TeamMember) => {
    setFormData({
      name: member.name,
      role: member.role,
      experience: member.experience,
      description: member.description
    })
    setEditingId(member.id)
    setAdding(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return

    try {
      const { error } = await supabase
        .from('team_members')
        .update({ is_active: false })
        .eq('id', id)

      if (error) throw error
      toast({ title: "Success", description: "Team member deleted successfully" })
      fetchTeamMembers()
    } catch (error) {
      console.error('Error deleting team member:', error)
      toast({
        title: "Error",
        description: "Failed to delete team member",
        variant: "destructive"
      })
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setAdding(false)
    setFormData({ name: '', role: '', experience: '', description: '' })
  }

  if (loading) {
    return <div className="text-center py-8">Loading team members...</div>
  }

  return (
    <div className="space-y-6">
      {isAdmin && (
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Manage Team Members</h3>
          <Button onClick={() => setAdding(true)} disabled={adding || !!editingId}>
            <Plus className="w-4 h-4 mr-2" />
            Add Team Member
          </Button>
        </div>
      )}

      {(adding || editingId) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Team Member' : 'Add Team Member'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              placeholder="Role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            />
            <Input
              placeholder="Experience"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            />
            <Textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={!formData.name || !formData.role}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {teamMembers.map((member) => (
          <div key={member.id} className="card-elevated p-8 hover:scale-105 transition-transform duration-300 relative group">
            {isAdmin && (
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(member)}
                  disabled={adding || !!editingId}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(member.id)}
                  disabled={adding || !!editingId}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            )}

            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-primary font-semibold mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground mb-4">{member.experience}</p>
                <p className="text-muted-foreground">{member.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
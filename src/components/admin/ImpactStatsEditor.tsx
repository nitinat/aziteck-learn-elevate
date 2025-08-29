import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

interface ImpactStat {
  id: string
  label: string
  value: string
  display_order: number
  is_active: boolean
}

interface ImpactStatsEditorProps {
  isAdmin: boolean
}

export default function ImpactStatsEditor({ isAdmin }: ImpactStatsEditorProps) {
  const [impactStats, setImpactStats] = useState<ImpactStat[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    label: '',
    value: ''
  })

  useEffect(() => {
    fetchImpactStats()
  }, [])

  const fetchImpactStats = async () => {
    try {
      const { data, error } = await supabase
        .from('impact_stats')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })

      if (error) throw error
      setImpactStats(data || [])
    } catch (error) {
      console.error('Error fetching impact stats:', error)
      toast({
        title: "Error",
        description: "Failed to load impact statistics",
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
          .from('impact_stats')
          .update(formData)
          .eq('id', editingId)

        if (error) throw error
        toast({ title: "Success", description: "Impact statistic updated successfully" })
      } else {
        const maxOrder = Math.max(...impactStats.map(s => s.display_order), 0)
        const { error } = await supabase
          .from('impact_stats')
          .insert({
            ...formData,
            display_order: maxOrder + 1
          })

        if (error) throw error
        toast({ title: "Success", description: "Impact statistic added successfully" })
      }

      setEditingId(null)
      setAdding(false)
      setFormData({ label: '', value: '' })
      fetchImpactStats()
    } catch (error) {
      console.error('Error saving impact stat:', error)
      toast({
        title: "Error",
        description: "Failed to save impact statistic",
        variant: "destructive"
      })
    }
  }

  const handleEdit = (stat: ImpactStat) => {
    setFormData({
      label: stat.label,
      value: stat.value
    })
    setEditingId(stat.id)
    setAdding(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this impact statistic?')) return

    try {
      const { error } = await supabase
        .from('impact_stats')
        .update({ is_active: false })
        .eq('id', id)

      if (error) throw error
      toast({ title: "Success", description: "Impact statistic deleted successfully" })
      fetchImpactStats()
    } catch (error) {
      console.error('Error deleting impact stat:', error)
      toast({
        title: "Error",
        description: "Failed to delete impact statistic",
        variant: "destructive"
      })
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setAdding(false)
    setFormData({ label: '', value: '' })
  }

  if (loading) {
    return <div className="text-center py-8">Loading impact statistics...</div>
  }

  return (
    <div className="space-y-6">
      {isAdmin && (
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Manage Impact Statistics</h3>
          <Button onClick={() => setAdding(true)} disabled={adding || !!editingId}>
            <Plus className="w-4 h-4 mr-2" />
            Add Statistic
          </Button>
        </div>
      )}

      {(adding || editingId) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Impact Statistic' : 'Add Impact Statistic'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Label (e.g., Students Trained)"
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
            />
            <Input
              placeholder="Value (e.g., 500+)"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
            />
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={!formData.label || !formData.value}>
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {impactStats.map((stat) => (
          <div key={stat.id} className="text-center relative group">
            {isAdmin && (
              <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(stat)}
                  disabled={adding || !!editingId}
                  className="h-8 w-8 p-0"
                >
                  <Edit2 className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(stat.id)}
                  disabled={adding || !!editingId}
                  className="h-8 w-8 p-0"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            )}
            <div className="text-4xl font-bold text-gradient mb-2">{stat.value}</div>
            <div className="text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
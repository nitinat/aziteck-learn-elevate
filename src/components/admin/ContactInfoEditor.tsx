import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Edit, Save, X } from 'lucide-react'
import { toast } from 'sonner'

interface ContactInfoItem {
  icon: any
  title: string
  content: string
  description: string
}

interface ContactInfoEditorProps {
  contactInfo: ContactInfoItem[]
  onUpdate: (updatedInfo: ContactInfoItem[]) => void
}

export function ContactInfoEditor({ contactInfo, onUpdate }: ContactInfoEditorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [editingInfo, setEditingInfo] = useState<ContactInfoItem[]>(contactInfo)

  const handleSave = () => {
    onUpdate(editingInfo)
    setIsOpen(false)
    toast.success('Contact information updated successfully')
  }

  const handleCancel = () => {
    setEditingInfo(contactInfo)
    setIsOpen(false)
  }

  const updateField = (index: number, field: keyof ContactInfoItem, value: string) => {
    const updated = [...editingInfo]
    updated[index] = { ...updated[index], [field]: value }
    setEditingInfo(updated)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto">
          <Edit className="w-4 h-4 mr-2" />
          Edit Contact Info
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Contact Information</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {editingInfo.map((info, index) => (
            <div key={index} className="border border-border rounded-lg p-4 space-y-4">
              <div>
                <Label htmlFor={`title-${index}`}>Title</Label>
                <Input
                  id={`title-${index}`}
                  value={info.title}
                  onChange={(e) => updateField(index, 'title', e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor={`content-${index}`}>Content</Label>
                <Input
                  id={`content-${index}`}
                  value={info.content}
                  onChange={(e) => updateField(index, 'content', e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor={`description-${index}`}>Description</Label>
                <Textarea
                  id={`description-${index}`}
                  value={info.description}
                  onChange={(e) => updateField(index, 'description', e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={handleCancel}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
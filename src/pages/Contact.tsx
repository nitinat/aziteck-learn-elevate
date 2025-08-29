import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Users, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ContactInfoEditor } from "@/components/admin/ContactInfoEditor"
import { useAdmin } from "@/hooks/useAdmin"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useState, useEffect } from "react"

// Icon mapping for database storage
const iconMap = {
  Mail,
  Phone,
  MapPin,
  Clock
}

const defaultContactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    content: "hello@aziteck.com",
    description: "Send us an email and we'll respond within 24 hours"
  },
  {
    icon: Phone,
    title: "Call Us",
    content: "+1 (555) 123-4567",
    description: "Speak directly with our team during business hours"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    content: "123 Innovation Drive, Tech City, TC 12345",
    description: "Schedule a visit to our modern learning facility"
  },
  {
    icon: Clock,
    title: "Business Hours",
    content: "Mon-Fri: 9AM-6PM PST",
    description: "We're here to help during these hours"
  }
]

const inquiryTypes = [
  { value: "courses", label: "Course Information" },
  { value: "services", label: "Business Services" },
  { value: "demo", label: "Request a Demo" },
  { value: "consultation", label: "Free Consultation" },
  { value: "partnership", label: "Partnership Opportunities" },
  { value: "support", label: "Technical Support" },
  { value: "other", label: "Other" }
]

export default function Contact() {
  const { isAdmin } = useAdmin()
  const { toast } = useToast()
  const [contactInfo, setContactInfo] = useState(defaultContactInfo)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    inquiryType: "",
    message: ""
  })

  // Load contact info from database
  useEffect(() => {
    const loadContactInfo = async () => {
      try {
        const { data, error } = await supabase
          .from('contact_info')
          .select('*')
          .eq('is_active', true)
          .order('display_order')

        if (error) {
          console.error('Error loading contact info:', error)
          return
        }

        if (data && data.length > 0) {
          const formattedData = data.map(item => ({
            icon: iconMap[item.icon_name as keyof typeof iconMap] || Mail,
            title: item.title,
            content: item.content,
            description: item.description,
            id: item.id
          }))
          setContactInfo(formattedData)
        }
      } catch (error) {
        console.error('Error loading contact info:', error)
      } finally {
        setLoading(false)
      }
    }

    loadContactInfo()
  }, [])

  const handleContactInfoUpdate = async (updatedInfo: typeof defaultContactInfo) => {
    try {
      // Update each contact info item in the database
      for (const info of updatedInfo) {
        const iconName = Object.keys(iconMap).find(
          key => iconMap[key as keyof typeof iconMap] === info.icon
        ) || 'Mail'

        const { error } = await supabase
          .from('contact_info')
          .update({
            title: info.title,
            content: info.content,
            description: info.description,
            icon_name: iconName,
            updated_at: new Date().toISOString()
          })
          .eq('id', (info as any).id)

        if (error) {
          console.error('Error updating contact info:', error)
          toast({
            title: "Error",
            description: "Failed to update contact information",
            variant: "destructive"
          })
          return
        }
      }

      setContactInfo(updatedInfo)
      toast({
        title: "Success",
        description: "Contact information updated successfully"
      })
    } catch (error) {
      console.error('Error updating contact info:', error)
      toast({
        title: "Error",
        description: "Failed to update contact information",
        variant: "destructive"
      })
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.inquiryType || !formData.message) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields marked with *",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      })

      if (error) throw error

      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours."
      })

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        inquiryType: "",
        message: ""
      })
    } catch (error) {
      console.error('Error sending message:', error)
      toast({
        title: "Error Sending Message",
        description: "Something went wrong. Please try again or contact us directly.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-primary/5 via-background to-secondary/5">
        <div className="section-container text-center">
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-gradient">Get In Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions about our courses or services? Want to explore how AI can transform your business? 
            We'd love to hear from you and help you on your journey.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="card-elevated p-8">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input 
                      id="firstName" 
                      placeholder="John" 
                      className="mt-2"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Doe" 
                      className="mt-2"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    className="mt-2"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="+1 (555) 123-4567" 
                    className="mt-2"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="company">Company/Organization</Label>
                  <Input 
                    id="company" 
                    placeholder="Acme Inc." 
                    className="mt-2"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="inquiryType">Inquiry Type *</Label>
                  <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange("inquiryType", value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      {inquiryTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us about your goals, questions, or how we can help you..."
                    className="mt-2 min-h-[120px]"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="btn-hero w-full" disabled={isSubmitting}>
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Contact Information</h2>
                  {isAdmin && (
                    <ContactInfoEditor 
                      contactInfo={contactInfo}
                      onUpdate={handleContactInfoUpdate}
                    />
                  )}
                </div>
                <div className="space-y-6">
                  {loading ? (
                    <div className="text-center">Loading contact information...</div>
                  ) : (
                    contactInfo.map((info, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                          <info.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{info.title}</h3>
                          <p className="text-primary font-medium mb-1">{info.content}</p>
                          <p className="text-sm text-muted-foreground">{info.description}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card-elevated p-6">
                <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule a Free Consultation
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Join Our Community Chat
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Book a Campus Tour
                  </Button>
                </div>
              </div>

              {/* Social Media */}
              <div className="card-elevated p-6">
                <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                <p className="text-muted-foreground mb-4">
                  Stay updated with the latest AI trends, course announcements, and success stories.
                </p>
                <div className="flex gap-4">
                  <Button variant="outline" size="sm">LinkedIn</Button>
                  <Button variant="outline" size="sm">Twitter</Button>
                  <Button variant="outline" size="sm">YouTube</Button>
                  <Button variant="outline" size="sm">Discord</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Quick answers to common questions about our courses and services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "How long does it take to complete the AI/ML program?",
                answer: "Our complete program spans 4 levels, taking approximately 36 weeks to complete. However, you can progress at your own pace."
              },
              {
                question: "Do I need programming experience to start?",
                answer: "No prior programming experience is required for Level 1. We start with fundamentals and build up your skills progressively."
              },
              {
                question: "What kind of job placement support do you provide?",
                answer: "We offer resume reviews, interview preparation, portfolio development, and direct connections with our industry partners."
              },
              {
                question: "Can you customize training for our company?",
                answer: "Yes! We offer custom corporate training programs tailored to your team's specific needs and industry requirements."
              }
            ].map((faq, index) => (
              <div key={index} className="card-elevated p-6">
                <h3 className="font-semibold mb-3">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="section-container text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your AI Journey?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Don't wait to transform your career or business. Get started today with a free consultation.
          </p>
          <Button size="lg" className="btn-hero text-lg px-8 py-6">
            Schedule Free Consultation
            <Calendar className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  )
}
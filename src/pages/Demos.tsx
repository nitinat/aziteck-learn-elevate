import { ExternalLink, Play, Code, Database, BarChart3, Users, BookOpen, Building2, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/hooks/useAuth"
import DemoVideoManager from "@/components/admin/DemoVideoManager"

const demos = [
  {
    title: "Employee Management Dashboard",
    description: "Complete HR management system with employee records, payroll, attendance tracking, and performance analytics.",
    category: "Business Intelligence",
    technologies: ["React", "Node.js", "PostgreSQL", "Chart.js"],
    features: [
      "Employee profile management",
      "Automated payroll processing", 
      "Real-time attendance tracking",
      "Performance analytics dashboard",
      "Leave management system"
    ],
    image: "/api/placeholder/600/400",
    demoUrl: "#",
    codeUrl: "#",
    videoUrl: null,
    icon: Users
  },
  {
    title: "School Management System",
    description: "Comprehensive educational platform for managing students, courses, grades, and administrative tasks.",
    category: "Education Technology",
    technologies: ["React", "Express.js", "MongoDB", "Socket.io"],
    features: [
      "Student enrollment system",
      "Course and curriculum management",
      "Grade book and reporting",
      "Parent-teacher communication",
      "Fee management"
    ],
    image: "/api/placeholder/600/400",
    demoUrl: "#",
    codeUrl: "#",
    videoUrl: null,
    icon: BookOpen
  },
  {
    title: "ERP Enterprise Portal",
    description: "Full-scale Enterprise Resource Planning system integrating finance, inventory, sales, and customer management.",
    category: "Enterprise Software",
    technologies: ["React", "Spring Boot", "MySQL", "Redis"],
    features: [
      "Financial management module",
      "Inventory tracking system",
      "Sales pipeline management", 
      "Customer relationship management",
      "Reporting and analytics"
    ],
    image: "/api/placeholder/600/400",
    demoUrl: "#",
    codeUrl: "#",
    videoUrl: null,
    icon: Building2
  },
  {
    title: "AI-Powered Analytics Dashboard",
    description: "Machine learning dashboard providing predictive analytics, data visualization, and automated insights.",
    category: "Artificial Intelligence",
    technologies: ["Python", "TensorFlow", "React", "FastAPI"],
    features: [
      "Predictive modeling",
      "Real-time data visualization",
      "Automated report generation",
      "Machine learning insights",
      "Custom AI model deployment"
    ],
    image: "/api/placeholder/600/400",
    demoUrl: "#",
    codeUrl: "#",
    videoUrl: null,
    icon: BarChart3
  },
  {
    title: "Smart Inventory System",
    description: "AI-driven inventory management with demand forecasting, automatic reordering, and supply chain optimization.",
    category: "Supply Chain",
    technologies: ["React", "Python", "scikit-learn", "PostgreSQL"],
    features: [
      "Demand forecasting algorithms",
      "Automated reorder points",
      "Supplier management",
      "Warehouse optimization",
      "Cost analysis tools"
    ],
    image: "/api/placeholder/600/400",
    demoUrl: "#",
    codeUrl: "#",
    videoUrl: null,
    icon: Database
  },
  {
    title: "Customer Service Chatbot",
    description: "Intelligent conversational AI for customer support with natural language processing and learning capabilities.",
    category: "Natural Language Processing",
    technologies: ["Python", "NLP", "React", "WebSocket"],
    features: [
      "Natural language understanding",
      "Multi-language support",
      "Sentiment analysis",
      "Escalation to human agents",
      "Knowledge base integration"
    ],
    image: "/api/placeholder/600/400",
    demoUrl: "#",
    codeUrl: "#",
    videoUrl: null,
    icon: Users
  }
]

const categories = ["All", "Business Intelligence", "Education Technology", "Enterprise Software", "Artificial Intelligence", "Supply Chain", "Natural Language Processing"]

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
}

export default function Demos() {
  const { user } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [dbDemos, setDbDemos] = useState<DemoVideo[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAdminStatus()
    fetchDemos()
  }, [user])

  const checkAdminStatus = async () => {
    try {
      if (user) {
        const { data, error } = await supabase.rpc('is_admin', { user_id: user.id })
        if (!error) {
          setIsAdmin(data)
        }
      } else {
        setIsAdmin(false)
      }
    } catch (error) {
      console.error('Error checking admin status:', error)
    }
  }

  const fetchDemos = async () => {
    try {
      const { data, error } = await supabase
        .from('demo_videos')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) throw error
      setDbDemos(data || [])
    } catch (error) {
      console.error('Error fetching demos:', error)
    } finally {
      setLoading(false)
    }
  }

  // Combine static demos with database demos
  const allDemos = [...demos, ...dbDemos.map(dbDemo => ({
    title: dbDemo.title,
    description: dbDemo.description || "",
    category: dbDemo.category,
    technologies: dbDemo.technologies,
    features: dbDemo.features,
    image: dbDemo.image_url || "/api/placeholder/600/400",
    demoUrl: dbDemo.demo_url || "#",
    codeUrl: dbDemo.code_url || "#",
    videoUrl: dbDemo.video_url,
    icon: Database // Default icon for DB demos
  }))]

  // Get all categories including database demo categories
  const allCategories = [
    "All",
    ...new Set([
      ...categories.slice(1), // Exclude "All" from static categories
      ...dbDemos.map(demo => demo.category)
    ])
  ]

  // Filter demos based on selected category
  const filteredDemos = selectedCategory === "All" 
    ? allDemos 
    : allDemos.filter(demo => demo.category === selectedCategory)

  if (showAdminPanel && isAdmin) {
    return (
      <div className="min-h-screen pt-20">
        <div className="section-container py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Admin Panel - Demo Videos</h1>
            <Button variant="outline" onClick={() => setShowAdminPanel(false)}>
              Back to Demos
            </Button>
          </div>
          <DemoVideoManager />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-primary/5 via-background to-secondary/5">
        <div className="section-container text-center">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-5xl font-bold">
              <span className="text-gradient">Live Demos & Showcases</span>
            </h1>
            {isAdmin && (
              <Button 
                onClick={() => setShowAdminPanel(true)}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Manage Demos
              </Button>
            )}
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Explore our portfolio of real-world applications built by our students and used by actual businesses. Try live demos and see the code behind each project.
          </p>
          
          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {allCategories.map((category) => (
              <Badge 
                key={category} 
                variant={category === selectedCategory ? "default" : "secondary"}
                className="cursor-pointer hover:scale-105 transition-transform duration-200"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Demos Grid */}
      <section className="py-20">
        <div className="section-container">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading demos...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredDemos.map((demo, index) => (
              <div key={index} className="card-interactive p-0 overflow-hidden group">
                {/* Demo Image/Preview */}
                <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 h-48 flex items-center justify-center">
                  <demo.icon className="w-16 h-16 text-primary/60" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    {demo.videoUrl ? (
                      <Button size="lg" variant="secondary" className="animate-scale-in" asChild>
                        <a href={demo.videoUrl} target="_blank" rel="noopener noreferrer">
                          <Play className="w-5 h-5 mr-2" />
                          Watch Video
                        </a>
                      </Button>
                    ) : (
                      <Button size="lg" variant="secondary" className="animate-scale-in">
                        <Play className="w-5 h-5 mr-2" />
                        Try Demo
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="text-xs">
                      {demo.category}
                    </Badge>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Code className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-200">
                    {demo.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {demo.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {demo.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    <h4 className="font-semibold text-sm">Key Features:</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {demo.features.slice(0, 3).map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-primary rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                      {demo.features.length > 3 && (
                        <li className="text-primary text-xs">+{demo.features.length - 3} more features</li>
                      )}
                    </ul>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 btn-hero" asChild>
                      <a href={demo.demoUrl} target="_blank" rel="noopener noreferrer">
                        <Play className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1" asChild>
                      <a href={demo.codeUrl} target="_blank" rel="noopener noreferrer">
                        <Code className="w-4 h-4 mr-2" />
                        View Code
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
              ))}
            </div>
          )}
          
          {filteredDemos.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No demos found for the selected category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 bg-muted/30">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Try Our Interactive Demos</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the power of our AI/ML solutions firsthand with these interactive demonstrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card-elevated p-6 text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-shadow duration-300">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Predictive Analytics</h3>
              <p className="text-muted-foreground mb-6">
                Try our machine learning model that predicts sales trends and customer behavior.
              </p>
              <Button className="btn-hero w-full">
                Launch Demo
              </Button>
            </div>

            <div className="card-elevated p-6 text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-secondary to-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-shadow duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">AI Chatbot</h3>
              <p className="text-muted-foreground mb-6">
                Interact with our intelligent customer service chatbot powered by natural language processing.
              </p>
              <Button className="btn-hero w-full">
                Start Chat
              </Button>
            </div>

            <div className="card-elevated p-6 text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-shadow duration-300">
                <Database className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Smart Inventory</h3>
              <p className="text-muted-foreground mb-6">
                Experience our AI-powered inventory management system with demand forecasting.
              </p>
              <Button className="btn-hero w-full">
                Explore System
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="section-container text-center">
          <h2 className="text-4xl font-bold mb-6">Want to Build Similar Applications?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Learn to create these powerful applications through our hands-on courses. Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-hero text-lg px-8 py-6">
              Start Learning
            </Button>
            <Button variant="outline" size="lg" className="btn-outline-hero text-lg px-8 py-6">
              Request Custom Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
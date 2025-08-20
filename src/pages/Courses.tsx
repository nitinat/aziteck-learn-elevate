import { Check, Clock, Users, Award, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const courses = [
  {
    level: "Level 1",
    title: "AI/ML Fundamentals",
    description: "Master the basics of artificial intelligence and machine learning with hands-on projects",
    duration: "6 weeks",
    students: "150+",
    price: "$299",
    features: [
      "Python Programming Basics",
      "Data Science Fundamentals",
      "Introduction to Machine Learning",
      "Basic Neural Networks",
      "Project: Predictive Analytics Dashboard",
      "Certificate of Completion"
    ],
    popular: false
  },
  {
    level: "Level 2", 
    title: "Deep Learning & Computer Vision",
    description: "Dive deep into neural networks, computer vision, and advanced ML algorithms",
    duration: "8 weeks",
    students: "200+",
    price: "$499",
    features: [
      "Deep Learning Frameworks",
      "Computer Vision Projects",
      "Natural Language Processing",
      "Advanced Neural Networks",
      "Project: Image Recognition System",
      "Industry Mentorship Included"
    ],
    popular: true
  },
  {
    level: "Level 3",
    title: "AI Engineering & Deployment",
    description: "Learn to deploy AI models in production environments and build scalable AI systems",
    duration: "10 weeks",
    students: "120+", 
    price: "$699",
    features: [
      "MLOps and Model Deployment",
      "Cloud AI Services (AWS/Azure)",
      "Microservices Architecture",
      "API Development for AI",
      "Project: Full-Stack AI Application",
      "Career Placement Support"
    ],
    popular: false
  },
  {
    level: "Level 4",
    title: "Advanced AI & Business Solutions",
    description: "Master advanced AI techniques and learn to solve complex business problems",
    duration: "12 weeks",
    students: "80+",
    price: "$999",
    features: [
      "Advanced AI Algorithms",
      "Business Intelligence Integration",
      "Custom AI Solution Development",
      "Team Leadership in AI Projects",
      "Capstone Project: Enterprise AI System",
      "Direct Industry Connections"
    ],
    popular: false
  }
]

export default function Courses() {
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-primary/5 via-background to-secondary/5">
        <div className="section-container text-center">
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-gradient">AI/ML Learning Path</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Our comprehensive 4-level curriculum takes you from beginner to AI expert through hands-on projects and real-world applications.
          </p>
          <div className="flex justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Self-paced learning</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Live mentorship</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>Industry certification</span>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {courses.map((course, index) => (
              <div 
                key={index} 
                className={`card-elevated p-8 relative ${course.popular ? 'ring-2 ring-primary shadow-glow' : ''} hover:scale-105 transition-transform duration-300`}
              >
                {course.popular && (
                  <Badge className="absolute -top-3 left-6 bg-gradient-to-r from-primary to-secondary text-white">
                    Most Popular
                  </Badge>
                )}
                
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-primary font-semibold">{course.level}</span>
                    <span className="text-3xl font-bold text-gradient">{course.price}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3">{course.title}</h3>
                  <p className="text-muted-foreground mb-4">{course.description}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{course.students} enrolled</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {course.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className={`w-full ${course.popular ? 'btn-hero' : 'btn-outline-hero'}`}
                  size="lg"
                >
                  Enroll Now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path Visualization */}
      <section className="py-20 bg-muted/30">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Your Learning Journey</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Follow our structured path from fundamentals to advanced AI engineering
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-secondary opacity-30"></div>
              
              {courses.map((course, index) => (
                <div key={index} className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="card-elevated p-6">
                      <div className="text-primary font-semibold mb-2">{course.level}</div>
                      <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                      <p className="text-muted-foreground text-sm">{course.description}</p>
                      <div className="mt-4 text-sm text-muted-foreground">
                        Duration: {course.duration}
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center z-10 relative">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="section-container text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your AI Journey?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our comprehensive program and transform your career with cutting-edge AI/ML skills.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-hero text-lg px-8 py-6">
              Start with Level 1
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="btn-outline-hero text-lg px-8 py-6">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
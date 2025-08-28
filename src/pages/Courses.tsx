import { Check, Clock, Users, Award, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const projectLevels = [
  {
    level: "Basic Level",
    title: "Foundation Projects",
    description: "Start with fundamental concepts through 10+ hands-on projects covering data analysis, Python basics, and simple machine learning",
    projectCount: "10+ Projects",
    students: "500+",
    price: "$299",
    concepts: [
      "Python Programming & Data Structures",
      "Data Analysis with Pandas & NumPy",
      "Data Visualization (Matplotlib, Seaborn)",
      "SQL Database Fundamentals",
      "Basic Statistics & Probability",
      "Introduction to Machine Learning"
    ],
    projectStructure: [
      "Problem Statement Analysis",
      "Step-by-step Code Implementation", 
      "Detailed Line-by-line Explanation"
    ],
    popular: false
  },
  {
    level: "Intermediate Level", 
    title: "Advanced Analytics Projects",
    description: "Build complex data solutions with 15+ projects focusing on machine learning, data engineering, and web development",
    projectCount: "15+ Projects",
    students: "350+",
    price: "$499",
    concepts: [
      "Advanced Machine Learning Algorithms",
      "Data Engineering & ETL Pipelines",
      "Web Development (Flask/Django)",
      "API Development & Integration",
      "Database Design & Optimization",
      "Statistical Modeling & Analysis"
    ],
    projectStructure: [
      "Real-world Problem Scenarios",
      "Production-ready Code Solutions",
      "In-depth Technical Commentary"
    ],
    popular: true
  },
  {
    level: "Advanced Level",
    title: "Expert-Level Projects",
    description: "Master complex systems with 12+ enterprise-grade projects including deep learning, full-stack development, and deployment",
    projectCount: "12+ Projects",
    students: "200+", 
    price: "$699",
    concepts: [
      "Deep Learning & Neural Networks",
      "Full-Stack Development (React/Node.js)",
      "Cloud Computing & Deployment (AWS/Azure)",
      "MLOps & Model Deployment",
      "Advanced Data Science Techniques",
      "System Architecture & Design"
    ],
    projectStructure: [
      "Complex Business Problem Analysis",
      "Scalable Architecture Implementation",
      "Professional Code Review & Best Practices"
    ],
    popular: false
  },
  {
    level: "Industrial Level",
    title: "Industry Partnership Projects",
    description: "Work on real industry projects with 5+ enterprise collaborations, gaining actual work experience and industry connections",
    projectCount: "5+ Live Projects",
    students: "100+",
    price: "$999",
    concepts: [
      "Enterprise-Level Project Management",
      "Industry Standard Development Practices",
      "Client Communication & Requirements",
      "Advanced System Integration",
      "Performance Optimization",
      "Professional Code Documentation"
    ],
    projectStructure: [
      "Real Industry Problem Solving",
      "Professional Development Standards",
      "Mentorship & Code Review Sessions"
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
            <span className="text-gradient">Project-Based Learning Path</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Master Data Science, Machine Learning, and Full-Stack Development through hands-on projects with detailed explanations, real code implementations, and industry applications.
          </p>
          <div className="flex justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Project-based learning</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>3-part project structure</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>Industry partnerships</span>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projectLevels.map((level, index) => (
              <div 
                key={index} 
                className={`card-elevated p-8 relative ${level.popular ? 'ring-2 ring-primary shadow-glow' : ''} hover:scale-105 transition-transform duration-300`}
              >
                {level.popular && (
                  <Badge className="absolute -top-3 left-6 bg-gradient-to-r from-primary to-secondary text-white">
                    Most Popular
                  </Badge>
                )}
                
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-primary font-semibold">{level.level}</span>
                    <span className="text-2xl font-bold text-primary">{level.price}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3">{level.title}</h3>
                  <p className="text-muted-foreground mb-4">{level.description}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{level.projectCount}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{level.students} enrolled</span>
                    </div>
                  </div>

                  {/* Project Structure */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-primary mb-3">Project Structure:</h4>
                    <div className="space-y-2">
                      {level.projectStructure.map((structure, structureIndex) => (
                        <div key={structureIndex} className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-secondary font-bold text-xs">{structureIndex + 1}</span>
                          </div>
                          <span className="text-sm font-medium">{structure}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Concepts/Skills */}
                <div className="space-y-3 mb-8">
                  <h4 className="font-semibold text-foreground mb-3">Key Concepts & Skills:</h4>
                  {level.concepts.map((concept, conceptIndex) => (
                    <div key={conceptIndex} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm">{concept}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className={`w-full ${level.popular ? 'btn-hero' : 'btn-outline-hero'}`}
                  size="lg"
                  disabled
                >
                  Start {level.level}
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
            <h2 className="text-4xl font-bold mb-4">Your Project-Based Journey</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Progress through 4 levels of hands-on projects, from basic concepts to real industry applications
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-secondary opacity-30"></div>
              
              {projectLevels.map((level, index) => (
                <div key={index} className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="card-elevated p-6">
                      <div className="text-primary font-semibold mb-2">{level.level}</div>
                      <h3 className="text-xl font-bold mb-2">{level.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{level.description}</p>
                      <div className="text-sm text-muted-foreground mb-2">
                        Projects: {level.projectCount}
                      </div>
                      <div className="text-lg font-bold text-primary">
                        {level.price}
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
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Project Journey?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Begin with Basic Level projects and progress through to real Industrial partnerships. Master Data Science, ML, Full-Stack Development, and Deployment through hands-on coding.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-hero text-lg px-8 py-6">
              Start Basic Level Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="btn-outline-hero text-lg px-8 py-6">
              View Sample Projects
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
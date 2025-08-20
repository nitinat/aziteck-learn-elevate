import { CheckCircle, ArrowRight, Zap, Code, BarChart3, Users, Shield, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const services = [
  {
    title: "AI Integration Services",
    description: "Transform your business with custom AI solutions that automate processes and provide intelligent insights.",
    icon: Zap,
    features: [
      "Machine Learning Model Development",
      "AI-Powered Analytics Implementation", 
      "Intelligent Automation Solutions",
      "Computer Vision Applications",
      "Natural Language Processing Systems"
    ],
    benefits: "Increase efficiency by 40-60% and reduce operational costs"
  },
  {
    title: "Custom Dashboard Development",
    description: "Build powerful, data-driven dashboards that provide real-time insights and business intelligence.",
    icon: BarChart3,
    features: [
      "Real-time Data Visualization",
      "Interactive Business Intelligence",
      "KPI Monitoring Systems",
      "Automated Report Generation",
      "Mobile-Responsive Design"
    ],
    benefits: "Make data-driven decisions 3x faster with clear visualizations"
  },
  {
    title: "Enterprise ERP Solutions",
    description: "Comprehensive enterprise resource planning systems tailored to your business needs and workflows.",
    icon: Globe,
    features: [
      "Financial Management Modules",
      "Inventory & Supply Chain Management",
      "Human Resources Integration",
      "Customer Relationship Management",
      "Scalable Architecture Design"
    ],
    benefits: "Streamline operations and improve productivity by 50%"
  },
  {
    title: "Custom Application Development",
    description: "Full-stack web and mobile applications designed specifically for your business requirements.",
    icon: Code,
    features: [
      "Web Application Development",
      "Mobile App Development",
      "API Development & Integration",
      "Database Design & Optimization",
      "Cloud Deployment & Scaling"
    ],
    benefits: "Get to market faster with solutions built for your exact needs"
  },
  {
    title: "Team Training & Consultation",
    description: "Upskill your team with our expert-led training programs and strategic AI/ML consultation.",
    icon: Users,
    features: [
      "Custom Team Training Programs",
      "AI/ML Strategy Consultation",
      "Technology Stack Advisory",
      "Best Practices Implementation",
      "Ongoing Technical Support"
    ],
    benefits: "Build internal expertise and reduce dependency on external vendors"
  },
  {
    title: "Security & Compliance",
    description: "Ensure your AI and data solutions meet industry standards and regulatory requirements.",
    icon: Shield,
    features: [
      "Data Security Implementation",
      "Compliance Framework Setup",
      "Privacy Protection Measures",
      "Security Audit & Assessment",
      "Risk Management Strategies"
    ],
    benefits: "Protect your business and customer data with enterprise-grade security"
  }
]

const industries = [
  { name: "Healthcare", projects: "15+ projects" },
  { name: "Finance", projects: "20+ projects" },
  { name: "Education", projects: "25+ projects" },
  { name: "Retail", projects: "18+ projects" },
  { name: "Manufacturing", projects: "12+ projects" },
  { name: "Technology", projects: "30+ projects" }
]

export default function Services() {
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-primary/5 via-background to-secondary/5">
        <div className="section-container text-center">
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-gradient">AI Solutions for Your Business</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Partner with Aziteck to integrate cutting-edge AI/ML technologies into your business operations. 
            From custom dashboards to enterprise ERP systems, we deliver solutions that drive growth.
          </p>
          <Button size="lg" className="btn-hero text-lg px-8 py-6">
            Schedule Free Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Core Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive AI and software development services designed to transform your business operations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="card-elevated p-8 group hover:scale-105 transition-transform duration-300">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:shadow-glow transition-shadow duration-300">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                    <p className="text-muted-foreground mb-6">{service.description}</p>
                    
                    <div className="space-y-3 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-muted/50 rounded-lg p-4 mb-6">
                      <p className="text-sm font-medium text-primary">{service.benefits}</p>
                    </div>
                    
                    <Button className="btn-outline-hero">
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-muted/30">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Industries We Serve</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our solutions are trusted by businesses across various industries to drive innovation and growth.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {industries.map((industry, index) => (
              <div key={index} className="card-elevated p-6 text-center group hover:scale-105 transition-transform duration-300">
                <h3 className="font-semibold mb-2">{industry.name}</h3>
                <p className="text-sm text-muted-foreground">{industry.projects}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Development Process</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A proven methodology that ensures successful project delivery and long-term business value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery & Analysis",
                description: "We analyze your business needs, current systems, and identify opportunities for AI integration."
              },
              {
                step: "02", 
                title: "Solution Design",
                description: "Our experts design a custom solution architecture tailored to your specific requirements."
              },
              {
                step: "03",
                title: "Development & Testing",
                description: "We build and rigorously test your solution using agile development methodologies."
              },
              {
                step: "04",
                title: "Deployment & Support",
                description: "We deploy your solution and provide ongoing support to ensure optimal performance."
              }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold mb-4">{process.title}</h3>
                <p className="text-muted-foreground">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-background to-secondary/10">
        <div className="section-container text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss how our AI/ML solutions can drive growth and efficiency in your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="btn-hero text-lg px-8 py-6">
              <Link to="/contact">
                Request a Demo <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="btn-outline-hero text-lg px-8 py-6">
              <Link to="/demos">
                View Our Work
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
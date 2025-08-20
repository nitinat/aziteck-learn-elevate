import { Target, Users, Lightbulb, Award, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We constantly push the boundaries of what's possible with AI and machine learning technologies."
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We believe in the power of teamwork and building strong partnerships with our students and clients."
  },
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for excellence in everything we do, from our teaching methods to our project delivery."
  },
  {
    icon: Award,
    title: "Success",
    description: "We measure our success by the achievements and career growth of our students and clients."
  }
]

const team = [
  {
    name: "Dr. Sarah Johnson",
    role: "Chief Technology Officer",
    experience: "15+ years in AI/ML research",
    description: "Former lead researcher at Microsoft AI, PhD in Computer Science from MIT."
  },
  {
    name: "Michael Chen",
    role: "Head of Curriculum",
    experience: "12+ years in tech education",
    description: "Ex-Google engineer with extensive experience in building scalable learning platforms."
  },
  {
    name: "Emily Rodriguez", 
    role: "Director of Business Solutions",
    experience: "10+ years in enterprise consulting",
    description: "Former McKinsey consultant specializing in digital transformation and AI strategy."
  },
  {
    name: "David Kumar",
    role: "Lead ML Engineer",
    experience: "8+ years in machine learning",
    description: "Previously at Tesla and OpenAI, expert in deep learning and computer vision."
  }
]

export default function About() {
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-primary/5 via-background to-secondary/5">
        <div className="section-container text-center">
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-gradient">About Aziteck</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're on a mission to democratize AI education and help businesses harness the power of artificial intelligence 
            through our proven "Learn by Doing" methodology.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                To bridge the gap between theoretical AI knowledge and practical implementation by providing 
                hands-on learning experiences that prepare students for real-world challenges.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe that the best way to learn AI and machine learning is by building actual projects 
                and solving real problems, not just memorizing concepts.
              </p>
            </div>
            
            <div className="card-elevated p-8">
              <h3 className="text-2xl font-bold mb-6 text-primary">Our Vision</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                To become the global leader in practical AI education, empowering millions of learners 
                worldwide to build intelligent solutions that solve humanity's greatest challenges.
              </p>
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6">
                <p className="font-semibold text-primary">
                  "Every student should graduate job-ready with a portfolio of real AI projects."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learn by Doing Philosophy */}
      <section className="py-20 bg-muted/30">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">The "Learn by Doing" Philosophy</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our unique approach ensures that every concept you learn is immediately applied to real-world projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-elevated p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Learn Concepts</h3>
              <p className="text-muted-foreground">
                Start with fundamental AI/ML concepts explained in simple, practical terms.
              </p>
            </div>

            <div className="card-elevated p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Build Projects</h3>
              <p className="text-muted-foreground">
                Immediately apply what you've learned by building real applications and solutions.
              </p>
            </div>

            <div className="card-elevated p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Deploy & Iterate</h3>
              <p className="text-muted-foreground">
                Deploy your projects to the real world and continuously improve them based on feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at Aziteck.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-shadow duration-300">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Meet Our Expert Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Industry veterans and AI experts who are passionate about education and innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card-elevated p-8 hover:scale-105 transition-transform duration-300">
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
      </section>

      {/* Success Stats */}
      <section className="py-20">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Impact in Numbers</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The results speak for themselves - we're proud of the success stories we've helped create.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-gradient mb-2">500+</div>
              <div className="text-muted-foreground">Students Trained</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gradient mb-2">95%</div>
              <div className="text-muted-foreground">Job Placement Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gradient mb-2">150+</div>
              <div className="text-muted-foreground">Business Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gradient mb-2">50+</div>
              <div className="text-muted-foreground">Real Projects Built</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-background to-secondary/10">
        <div className="section-container text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Join Our Community?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Become part of a thriving community of AI practitioners and innovators who are shaping the future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="btn-hero text-lg px-8 py-6">
              <Link to="/courses">
                Start Learning <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="btn-outline-hero text-lg px-8 py-6">
              <Link to="/contact">
                Get in Touch
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
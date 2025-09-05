import { ArrowRight, Brain, Code, Zap, Users, Award, TrendingUp, Play, Rocket, Star, Target, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"

interface InternshipBanner {
  id: string
  title: string
  subtitle: string
  video_url: string | null
  video_title: string
  video_description: string
  is_active: boolean
}

export default function Home() {
  const [bannerData, setBannerData] = useState<InternshipBanner | null>(null)

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const { data, error } = await supabase
          .from('internship_program_banner')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true })
          .limit(1)
          .single()

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching banner data:', error)
          return
        }

        if (data) {
          setBannerData(data)
        }
      } catch (error) {
        console.error('Error fetching banner data:', error)
      }
    }

    fetchBannerData()
  }, [])
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/20 to-background pt-20 pb-16">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23e5e7eb%22%20fill-opacity=%220.1%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        
        <div className="section-container relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="animate-fade-in-up">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="text-gradient">Innovate,</span><br />
                <span className="text-gradient">Elevate,</span><br />
                <span className="text-gradient">Accelerate</span>
              </h1>
            </div>
            
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Transform your career with Aziteck's AI/ML learning platform. Master cutting-edge technology through our proven "Learn by Doing" approach and real-world projects.
              </p>
            </div>

            <div className="animate-fade-in-up flex flex-col sm:flex-row gap-4 justify-center mb-12" style={{ animationDelay: '0.4s' }}>
              <Button asChild size="lg" className="btn-hero text-lg px-8 py-6">
                <Link to="/courses">
                  Start Learning <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="btn-outline-hero text-lg px-8 py-6">
                <Link to="/demos">
                  Explore Demos
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="animate-fade-in-up grid grid-cols-1 md:grid-cols-3 gap-8 mt-16" style={{ animationDelay: '0.6s' }}>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Students Trained</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-muted-foreground">Real Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">95%</div>
                <div className="text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Internship Program Marketing Banner */}
      {bannerData && (
        <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2280%22%20height=%2280%22%20viewBox=%220%200%2080%2080%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23f97316%22%20fill-opacity=%220.05%22%3E%3Cpath%20d=%22M0%200l40%2040L0%2080z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
          
          <div className="section-container relative">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg">
                <Rocket className="w-4 h-4" />
                NEW PROGRAM LAUNCHED
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="text-gradient">{bannerData.title.split(' ').slice(0, 2).join(' ')}</span><br />
                <span className="text-gradient">{bannerData.title.split(' ').slice(2).join(' ')}</span>
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
                {bannerData.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Video Section */}
              <div className="order-2 lg:order-1">
                <div className="bg-gradient-to-br from-background to-muted/50 rounded-3xl p-8 shadow-2xl border border-border/50">
                  {bannerData.video_url ? (
                    <div className="aspect-video rounded-2xl overflow-hidden mb-6">
                      <video 
                        src={bannerData.video_url} 
                        controls 
                        poster=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2250%22%20height=%2250%22%20viewBox=%220%200%2050%2050%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.05%22%3E%3Ccircle%20cx=%2225%22%20cy=%2225%22%20r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
                      <div className="text-center z-10">
                        <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                        <p className="text-muted-foreground font-medium">Video Coming Soon</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-3">{bannerData.video_title}</h3>
                    <p className="text-muted-foreground mb-4">
                      {bannerData.video_description}
                    </p>
                    {bannerData.video_url ? (
                      <Button size="lg" className="btn-hero w-full" asChild>
                        <a href={bannerData.video_url} target="_blank" rel="noopener noreferrer">
                          <Play className="w-4 h-4 mr-2" />
                          Watch Now
                        </a>
                      </Button>
                    ) : (
                      <Button size="lg" className="btn-hero w-full" disabled>
                        <Play className="w-4 h-4 mr-2" />
                        Coming Soon
                      </Button>
                    )}
                  </div>
                </div>
              </div>

            {/* Marketing Messages */}
            <div className="order-1 lg:order-2 space-y-6">
              <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-background to-muted/30 rounded-2xl border border-border/50 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">From Learner to Achiever!</h4>
                  <p className="text-muted-foreground">See how Aziteck's Internship cum Associate Program transforms skills into opportunities. Hit play & step into the future.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-background to-muted/30 rounded-2xl border border-border/50 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-secondary to-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Where Learning Meets Real Impact!</h4>
                  <p className="text-muted-foreground">Find out why our Internship cum Associate Program is the perfect blend of mentorship, projects, and career growth.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-background to-muted/30 rounded-2xl border border-border/50 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Future belongs to Doers, not just Learners</h4>
                  <p className="text-muted-foreground">Watch how Aziteck's Internship cum Associate Program turns passion into performance.</p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl border border-primary/20">
                <div className="text-center">
                  <h4 className="font-bold text-xl mb-3 text-gradient">Join the Program Today!</h4>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button size="lg" className="btn-hero flex-1">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Apply Now
                    </Button>
                    <Button size="lg" variant="outline" className="btn-outline-hero flex-1">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Aziteck?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our unique approach combines theoretical knowledge with hands-on experience, ensuring you're ready for real-world challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card-elevated p-8 text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-shadow duration-300">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Learn by Doing</h3>
              <p className="text-muted-foreground">
                Build real projects from day one. Our hands-on approach ensures you gain practical skills that employers value.
              </p>
            </div>

            <div className="card-elevated p-8 text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-secondary to-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-shadow duration-300">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Industry Projects</h3>
              <p className="text-muted-foreground">
                Work on real-world applications like ERP systems, dashboards, and AI-powered tools used in actual businesses.
              </p>
            </div>

            <div className="card-elevated p-8 text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-shadow duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Expert Mentorship</h3>
              <p className="text-muted-foreground">
                Learn from industry professionals who guide you through every step of your AI/ML journey.
              </p>
            </div>

            <div className="card-elevated p-8 text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-secondary to-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-shadow duration-300">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Certification</h3>
              <p className="text-muted-foreground">
                Earn industry-recognized certificates that showcase your skills to potential employers.
              </p>
            </div>

            <div className="card-elevated p-8 text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-shadow duration-300">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Career Growth</h3>
              <p className="text-muted-foreground">
                Our alumni land high-paying jobs at top tech companies. Join our success stories.
              </p>
            </div>

            <div className="card-elevated p-8 text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-secondary to-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-shadow duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Latest Technology</h3>
              <p className="text-muted-foreground">
                Stay ahead with the latest AI/ML tools, frameworks, and technologies used in the industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-background to-secondary/10">
        <div className="section-container text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Career?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of successful graduates who've accelerated their careers with Aziteck's proven learning methodology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="btn-hero text-lg px-8 py-6">
              <Link to="/courses">
                Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="btn-outline-hero text-lg px-8 py-6">
              <Link to="/contact">
                Talk to an Expert
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
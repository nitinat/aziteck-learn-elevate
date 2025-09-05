import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useAdmin } from '@/hooks/useAdmin'
import { Navigate } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { InternshipProgramManager } from '@/components/admin/InternshipProgramManager'
import TeamMemberEditor from '@/components/admin/TeamMemberEditor'
import ImpactStatsEditor from '@/components/admin/ImpactStatsEditor'
import DemoVideoManager from '@/components/admin/DemoVideoManager'
import { Settings, Video, Users, Phone, BarChart, Rocket } from 'lucide-react'

export default function Admin() {
  const { user } = useAuth()
  const { isAdmin, loading } = useAdmin()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Checking permissions...</p>
        </div>
      </div>
    )
  }

  if (!user || !isAdmin) {
    return <Navigate to="/auth" replace />
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="section-container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-xl text-muted-foreground">
            Manage your Aziteck platform content and settings
          </p>
        </div>

        <Tabs defaultValue="internship" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="internship" className="flex items-center gap-2">
              <Rocket className="w-4 h-4" />
              <span className="hidden sm:inline">Internship Program</span>
              <span className="sm:hidden">Program</span>
            </TabsTrigger>
            <TabsTrigger value="demos" className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              <span className="hidden sm:inline">Demo Videos</span>
              <span className="sm:hidden">Demos</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Team Members</span>
              <span className="sm:hidden">Team</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <BarChart className="w-4 h-4" />
              <span className="hidden sm:inline">Impact Stats</span>
              <span className="sm:hidden">Stats</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
              <span className="sm:hidden">Config</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="internship">
            <Card>
              <CardHeader>
                <CardTitle>Internship Program Management</CardTitle>
                <CardDescription>
                  Manage the internship program banner, video content, and marketing messages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <InternshipProgramManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="demos">
            <Card>
              <CardHeader>
                <CardTitle>Demo Video Management</CardTitle>
                <CardDescription>
                  Add, edit, and manage demo videos and their content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DemoVideoManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team">
            <Card>
              <CardHeader>
                <CardTitle>Team Member Management</CardTitle>
                <CardDescription>
                  Manage team member profiles and information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TeamMemberEditor isAdmin={isAdmin} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats">
            <Card>
              <CardHeader>
                <CardTitle>Impact Statistics</CardTitle>
                <CardDescription>
                  Update the impact statistics displayed on the homepage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ImpactStatsEditor isAdmin={isAdmin} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>
                  General platform configuration and settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Settings className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Additional platform settings will be available here
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Award, 
  TrendingUp, 
  Calendar,
  Target,
  BookOpen,
  Trophy,
  Star,
  Zap,
  Download,
  Share2,
  Settings,
  TreePine,
  Droplets,
  Wind,
  Recycle,
  Sun,
  Users,
  Crown,
  Medal,
  Shield,
  Leaf
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ecoBadges from "@/assets/eco-badges.png";

const Profile = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("overview");

  const studentProfile = {
    name: "Divya Prakash",
    school: "Delhi Public School, R.K. Puram",
    grade: "Class 10-A",
    joinDate: "September 2024",
    location: "New Delhi",
    totalPoints: 2340,
    currentLevel: "Expert",
    nextLevelPoints: 2500,
    rank: 15,
    weeklyStreak: 12,
    monthlyStreak: 45
  };

  const achievements = [
    {
      id: 1,
      name: "Eco Warrior",
      description: "Complete 50 environmental quizzes",
      icon: Shield,
      color: "text-green-600",
      bgColor: "bg-green-100",
      progress: 100,
      dateEarned: "Nov 20, 2024",
      points: 200,
      rarity: "Epic"
    },
    {
      id: 2,
      name: "Tree Protector",
      description: "Plant 10 trees in your locality",
      icon: TreePine,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
      progress: 100,
      dateEarned: "Nov 15, 2024",
      points: 150,
      rarity: "Rare"
    },
    {
      id: 3,
      name: "Water Saver",
      description: "Complete 5 water conservation challenges",
      icon: Droplets,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      progress: 100,
      dateEarned: "Nov 10, 2024",
      points: 120,
      rarity: "Rare"
    },
    {
      id: 4,
      name: "Clean Air Champion",
      description: "Achieve 90% score in air pollution quizzes",
      icon: Wind,
      color: "text-sky-600",
      bgColor: "bg-sky-100",
      progress: 100,
      dateEarned: "Nov 8, 2024",
      points: 100,
      rarity: "Common"
    },
    {
      id: 5,
      name: "Recycling Hero",
      description: "Complete waste management challenges",
      icon: Recycle,
      color: "text-teal-600",
      bgColor: "bg-teal-100",
      progress: 100,
      dateEarned: "Nov 5, 2024",
      points: 80,
      rarity: "Common"
    },
    {
      id: 6,
      name: "Solar Advocate",
      description: "Master renewable energy topics",
      icon: Sun,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      progress: 75,
      dateEarned: null,
      points: 100,
      rarity: "Common"
    },
    {
      id: 7,
      name: "Community Leader",
      description: "Lead 3 community environmental drives",  
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100", 
      progress: 33,
      dateEarned: null,
      points: 250,
      rarity: "Legendary"
    },
    {
      id: 8,
      name: "Quiz Master",
      description: "Achieve perfect scores in 20 quizzes",
      icon: Crown,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
      progress: 90,
      dateEarned: null,
      points: 300,
      rarity: "Epic"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "quiz",
      title: "Climate Change Fundamentals Quiz",
      points: 18,
      timestamp: "2 hours ago",
      icon: BookOpen
    },
    {
      id: 2,
      type: "challenge",
      title: "Completed: Energy Saving Week",
      points: 80,
      timestamp: "1 day ago",
      icon: Target
    },
    {
      id: 3,
      type: "badge",
      title: "Earned: Eco Warrior Badge",
      points: 200,
      timestamp: "3 days ago", 
      icon: Award
    },
    {
      id: 4,
      type: "quiz",
      title: "Water Pollution in India Quiz",
      points: 20,
      timestamp: "4 days ago",
      icon: BookOpen
    },
    {
      id: 5,
      type: "challenge",
      title: "Completed: Tree Plantation Drive",
      points: 100,
      timestamp: "1 week ago",
      icon: Target
    }
  ];

  const monthlyStats = [
    { label: "Quizzes Completed", value: 28, change: "+12%" },
    { label: "Challenges Done", value: 5, change: "+25%" },
    { label: "Points Earned", value: 1240, change: "+18%" },
    { label: "Position Climbed", value: 8, change: "+200%" }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common": return "text-gray-600 bg-gray-100";
      case "Rare": return "text-blue-600 bg-blue-100";  
      case "Epic": return "text-purple-600 bg-purple-100";
      case "Legendary": return "text-yellow-600 bg-yellow-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const levelProgress = ((studentProfile.totalPoints % 500) / 500) * 100;

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
              className="mb-2"
            >
              ← Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <User className="h-8 w-8 text-primary" />
              My Profile
            </h1>
            <p className="text-muted-foreground">
              Track your environmental learning journey and achievements
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share Profile
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Profile Header Card */}
        <Card className="overflow-hidden">
          <div className="eco-gradient text-white p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-white/20">
                <AvatarFallback className="text-2xl font-bold text-primary bg-white">
                  {studentProfile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">{studentProfile.name}</h2>
                <p className="opacity-90 mb-2">{studentProfile.school}</p>
                <p className="opacity-80 text-sm mb-4">{studentProfile.grade} • {studentProfile.location}</p>
                
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4" />
                    <span>Rank #{studentProfile.rank}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    <span>{studentProfile.totalPoints} points</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    <span>{studentProfile.currentLevel} Level</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {studentProfile.joinDate}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Level Progress */}
            <div className="mt-6 p-4 bg-white/10 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Level Progress</span>
                <span className="text-sm">{studentProfile.totalPoints} / {studentProfile.nextLevelPoints}</span>
              </div>
              <Progress value={levelProgress} className="h-2 bg-white/20" />
              <div className="text-sm opacity-80 mt-1">
                {studentProfile.nextLevelPoints - studentProfile.totalPoints} points to next level
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {monthlyStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold mb-1">{stat.value.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground mb-2">{stat.label}</div>
                <Badge variant="outline" className="text-xs text-success">
                  {stat.change} this month
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Recent Activity
                    </CardTitle>
                    <CardDescription>
                      Your latest learning activities and achievements
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center gap-4 p-3 border rounded-lg">
                          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <activity.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{activity.title}</p>
                            <p className="text-sm text-muted-foreground">{activity.timestamp}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-success">+{activity.points}</div>
                            <div className="text-xs text-muted-foreground">points</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Streak & Performance */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-warning" />
                      Learning Streak
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">
                      {studentProfile.weeklyStreak}
                    </div>
                    <div className="text-muted-foreground mb-4">Days this week</div>
                    <div className="text-sm">
                      <div className="font-medium">Monthly: {studentProfile.monthlyStreak} days</div>
                      <div className="text-muted-foreground">Keep it up! 🔥</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Download Certificates
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Achievement
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Trophy className="h-4 w-4 mr-2" />
                      View Leaderboard
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            {/* Achievement Gallery Header */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-warning" />
                  Achievement Gallery
                </CardTitle>
                <CardDescription>
                  Collect badges by completing quizzes and environmental challenges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold">5</span>
                    <span className="text-muted-foreground ml-2">out of 8 badges earned</span>
                  </div>
                  <Progress value={62.5} className="w-32" />
                </div>
                <img 
                  src={ecoBadges} 
                  alt="Badge Collection Preview" 
                  className="w-full max-w-md mx-auto rounded-lg"
                />
              </CardContent>
            </Card>

            {/* Achievement Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className={`relative overflow-hidden eco-transition hover:nature-shadow ${
                  achievement.progress === 100 ? 'ring-2 ring-success/20' : ''
                }`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`h-12 w-12 rounded-full ${achievement.bgColor} flex items-center justify-center ${
                          achievement.progress === 100 ? 'achievement-pulse' : ''
                        }`}>
                          <achievement.icon className={`h-6 w-6 ${achievement.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{achievement.name}</CardTitle>
                          <Badge className={getRarityColor(achievement.rarity)} variant="secondary">
                            {achievement.rarity}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">+{achievement.points}</div>
                        <div className="text-xs text-muted-foreground">points</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {achievement.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{achievement.progress}%</span>
                      </div>
                      <Progress value={achievement.progress} className="h-2" />
                    </div>

                    {achievement.dateEarned ? (
                      <div className="flex items-center gap-2 mt-4 text-sm text-success">
                        <Award className="h-4 w-4" />
                        Earned on {achievement.dateEarned}
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground mt-4">
                        {achievement.progress < 100 ? 'In Progress...' : 'Ready to claim!'}
                      </div>
                    )}
                  </CardContent>
                  
                  {achievement.progress === 100 && (
                    <div className="absolute top-2 right-2">
                      <div className="h-6 w-6 bg-success rounded-full flex items-center justify-center">
                        <Award className="h-3 w-3 text-white" />
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="certificates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Medal className="h-5 w-5 text-warning" />
                  Digital Certificates
                </CardTitle>
                <CardDescription>
                  Download and share your environmental learning certificates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Environmental Awareness Certificate",
                      description: "Completed 25 environmental awareness quizzes",
                      date: "November 2024",
                      verified: true
                    },
                    {
                      title: "Climate Action Champion",
                      description: "Completed climate change learning module",
                      date: "October 2024", 
                      verified: true
                    },
                    {
                      title: "Eco Challenge Participant",
                      description: "Participated in 5 environmental challenges",
                      date: "November 2024",
                      verified: true
                    },
                    {
                      title: "Water Conservation Expert",
                      description: "Mastered water conservation topics",
                      date: "In Progress",
                      verified: false
                    }
                  ].map((cert, index) => (
                    <Card key={index} className={`border-2 ${cert.verified ? 'border-success/20' : 'border-muted'}`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-lg mb-2">{cert.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{cert.description}</p>
                            <p className="text-sm font-medium">{cert.date}</p>
                          </div>
                          {cert.verified && (
                            <Badge className="bg-success/10 text-success">
                              <Award className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        
                        {cert.verified ? (
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
                              <Share2 className="h-4 w-4 mr-2" />
                              Share
                            </Button>
                          </div>
                        ) : (
                          <Button size="sm" variant="outline" disabled className="w-full">
                            Certificate Pending
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
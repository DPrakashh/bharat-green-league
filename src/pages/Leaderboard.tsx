import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Medal, 
  Crown, 
  TrendingUp, 
  Users, 
  Target,
  Calendar,
  Star,
  Zap,
  Award
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ecoSchool from "@/assets/eco-school.jpg";

interface School {
  id: number;
  name: string;
  location: string;
  points: number;
  students: number;
  rank: number;
  change: number;
  badge: string;
  avgQuizScore: number;
  challengesCompleted: number;
}

interface Student {
  id: number;
  name: string;
  school: string;
  points: number;
  rank: number;
  change: number;
  level: string;
  badges: number;
  weeklyPoints: number;
}

const Leaderboard = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("schools");

  const topSchools: School[] = [
    {
      id: 1,
      name: "Delhi Public School, R.K. Puram",
      location: "New Delhi",
      points: 45600,
      students: 1200,
      rank: 1,
      change: 0,
      badge: "Eco Champion",
      avgQuizScore: 87,
      challengesCompleted: 156
    },
    {
      id: 2,
      name: "Kendriya Vidyalaya No. 1",
      location: "Mumbai",
      points: 42800,
      students: 980,
      rank: 2,
      change: 1,
      badge: "Green Leader",
      avgQuizScore: 84,
      challengesCompleted: 142
    },
    {
      id: 3,
      name: "St. Xavier's School",
      location: "Bangalore",
      points: 41200,
      students: 850,
      rank: 3,
      change: -1,
      badge: "Nature Guardian",
      avgQuizScore: 82,
      challengesCompleted: 138
    },
    {
      id: 4,
      name: "DAV Public School",
      location: "Chennai",
      points: 38900,
      students: 920,
      rank: 4,
      change: 2,
      badge: "Eco Warrior",
      avgQuizScore: 79,
      challengesCompleted: 124
    },
    {
      id: 5,
      name: "Ryan International School",
      location: "Pune",
      points: 37500,
      students: 760,
      rank: 5,
      change: -1,
      badge: "Green Pioneer",
      avgQuizScore: 78,
      challengesCompleted: 119
    }
  ];

  const topStudents: Student[] = [
    {
      id: 1,
      name: "Divya Prakash",
      school: "Delhi Public School",
      points: 2340,
      rank: 1,
      change: 0,
      level: "Expert",
      badges: 12,
      weeklyPoints: 480
    },
    {
      id: 2,
      name: "Priya Patel",
      school: "Kendriya Vidyalaya",
      points: 2210,
      rank: 2,
      change: 3,
      level: "Expert",
      badges: 11,
      weeklyPoints: 520
    },
    {
      id: 3,
      name: "Rahul Kumar",
      school: "St. Xavier's School",
      points: 2150,
      rank: 3,
      change: -1,
      level: "Advanced",
      badges: 10,
      weeklyPoints: 380
    },
    {
      id: 4,
      name: "Sneha Reddy",
      school: "DAV Public School",
      points: 2090,
      rank: 4,
      change: 1,
      level: "Advanced",
      badges: 9,
      weeklyPoints: 420
    },
    {
      id: 5,
      name: "Vikram Singh",
      school: "Ryan International",
      points: 1980,
      rank: 5,
      change: -2,
      level: "Advanced",
      badges: 8,
      weeklyPoints: 290
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-sm font-bold">{rank}</div>;
    }
  };

  const getChangeIndicator = (change: number) => {
    if (change > 0) return <span className="text-success">↑{change}</span>;
    if (change < 0) return <span className="text-destructive">↓{Math.abs(change)}</span>;
    return <span className="text-muted-foreground">-</span>;
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert": return "text-yellow-600 bg-yellow-100";
      case "Advanced": return "text-purple-600 bg-purple-100";
      case "Intermediate": return "text-blue-600 bg-blue-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

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
              <Trophy className="h-8 w-8 text-primary" />
              EcoLearn Leaderboard
            </h1>
            <p className="text-muted-foreground">
              Top performing schools and students across India
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Updated: Nov 2024
            </Badge>
            <Badge className="eco-gradient text-white">
              <Users className="h-3 w-3 mr-1" />
              50,000+ Students
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm text-muted-foreground">Participating Schools</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">50K+</div>
              <div className="text-sm text-muted-foreground">Active Students</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 mx-auto mb-2 text-success" />
              <div className="text-2xl font-bold">15K+</div>
              <div className="text-sm text-muted-foreground">Challenges Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-warning" />
              <div className="text-2xl font-bold">2.5M</div>
              <div className="text-sm text-muted-foreground">Total Points Earned</div>
            </CardContent>
          </Card>
        </div>

        {/* Hero School Spotlight */}
        <Card className="overflow-hidden">
          <div className="relative">
            <img 
              src={ecoSchool} 
              alt="Top performing eco school"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/60" />
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-center">
                <Crown className="h-12 w-12 mx-auto mb-3 text-yellow-300" />
                <h2 className="text-2xl font-bold mb-2">School of the Month</h2>
                <p className="text-lg">{topSchools[0].name}</p>
                <p className="opacity-90">{topSchools[0].points.toLocaleString()} points • {topSchools[0].students} students</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Leaderboard Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="schools" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              School Rankings
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Top Students
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schools" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Top Schools Leaderboard
                </CardTitle>
                <CardDescription>
                  Schools ranked by total eco-points earned by their students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topSchools.map((school, index) => (
                    <div key={school.id} className={`flex items-center gap-4 p-4 rounded-lg border eco-transition hover:nature-shadow ${
                      index < 3 ? 'bg-gradient-to-r from-primary/5 to-success/5' : ''
                    }`}>
                      <div className="flex-shrink-0">
                        {getRankIcon(school.rank)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{school.name}</h3>
                            <p className="text-sm text-muted-foreground">{school.location}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <Badge variant="outline">{school.badge}</Badge>
                              <span className="text-sm text-muted-foreground">
                                {school.students} students
                              </span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-xl font-bold text-primary">
                              {school.points.toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">points</div>
                            <div className="text-xs mt-1 flex items-center gap-2">
                              <span>Change: {getChangeIndicator(school.change)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Avg Quiz Score:</span>
                            <span className="ml-2 font-medium">{school.avgQuizScore}%</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Challenges:</span>
                            <span className="ml-2 font-medium">{school.challengesCompleted}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  Top Students Leaderboard
                </CardTitle>
                <CardDescription>
                  Individual students with highest eco-points
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topStudents.map((student, index) => (
                    <div key={student.id} className={`flex items-center gap-4 p-4 rounded-lg border eco-transition hover:nature-shadow ${
                      index < 3 ? 'bg-gradient-to-r from-primary/5 to-success/5' : ''
                    }`}>
                      <div className="flex-shrink-0">
                        {getRankIcon(student.rank)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{student.name}</h3>
                            <p className="text-sm text-muted-foreground">{student.school}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className={getLevelColor(student.level)}>
                                {student.level}
                              </Badge>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Award className="h-3 w-3" />
                                {student.badges} badges
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-xl font-bold text-primary">
                              {student.points.toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">total points</div>
                            <div className="text-xs mt-1 flex items-center gap-2">
                              <span>Change: {getChangeIndicator(student.change)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-3 pt-3 border-t">
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Zap className="h-3 w-3 text-success" />
                              <span className="text-muted-foreground">This week:</span>
                              <span className="font-medium text-success">+{student.weeklyPoints}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Your School Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Your School Performance
            </CardTitle>
            <CardDescription>
              Delhi Public School - Your current ranking and stats
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                15
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Delhi Public School, Sector 45</h3>
                <p className="text-sm text-muted-foreground">Rank #15 out of 500 schools</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Points:</span>
                    <span className="ml-2 font-medium text-primary">28,450</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Students:</span>
                    <span className="ml-2 font-medium">845</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-success">↑ 3 positions this month</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;
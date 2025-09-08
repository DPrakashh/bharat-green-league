import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Leaf, 
  Trophy, 
  Target, 
  BookOpen, 
  Award, 
  TrendingUp,
  Calendar,
  Clock,
  Users,
  Star,
  Zap,
  TreePine,
  Droplets,
  Wind,
  Recycle,
  Sun,
  Gift,
  Flame
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ecoBadges from "@/assets/eco-badges.png";
import BadgeUnlockCeremony from "@/components/gamification/BadgeUnlockCeremony";
import StreakCounter from "@/components/gamification/StreakCounter";
import RewardWheel from "@/components/gamification/RewardWheel";
import TeamFormation from "@/components/gamification/TeamFormation";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentPoints, setCurrentPoints] = useState(1250);
  const [currentLevel, setCurrentLevel] = useState("Intermediate");
  const [nextLevelPoints, setNextLevelPoints] = useState(500);
  const [showBadgeCeremony, setShowBadgeCeremony] = useState(false);
  const [selectedTab, setSelectedTab] = useState("overview");

  const studentStats = {
    name: "Arjun Sharma",
    school: "Delhi Public School",
    grade: "Class 10",
    rank: 15,
    totalStudents: 2500,
    weeklyStreak: 7,
    quizzesCompleted: 28,
    challengesCompleted: 5,
    badgesEarned: 8
  };

  const recentBadges = [
    { name: "Tree Protector", icon: TreePine, color: "text-green-600", earned: "2 days ago" },
    { name: "Water Saver", icon: Droplets, color: "text-blue-600", earned: "1 week ago" },
    { name: "Clean Air Champion", icon: Wind, color: "text-sky-600", earned: "2 weeks ago" },
    { name: "Recycling Hero", icon: Recycle, color: "text-emerald-600", earned: "3 weeks ago" }
  ];

  const quickActions = [
    {
      title: "Take Quiz",
      description: "Climate Change Basics",
      icon: BookOpen,
      color: "eco-gradient",
      points: "+20 points",
      action: () => navigate('/quiz')
    },
    {
      title: "Daily Challenge",
      description: "Plant a tree photo",
      icon: Target,
      color: "bg-success",
      points: "+50 points",
      action: () => navigate('/challenges')
    },
    {
      title: "View Leaderboard",
      description: "School rankings",
      icon: Trophy,
      color: "bg-warning",
      points: "See progress",
      action: () => navigate('/leaderboard')
    },
    {
      title: "My Achievements",
      description: "8 badges earned",
      icon: Award,
      color: "bg-secondary",
      points: "View all",
      action: () => navigate('/profile')
    }
  ];

  const environmentalData = [
    { city: "Delhi", aqi: 168, level: "Unhealthy", color: "text-red-600" },
    { city: "Mumbai", aqi: 89, level: "Moderate", color: "text-yellow-600" },
    { city: "Bangalore", aqi: 67, level: "Good", color: "text-green-600" },
    { city: "Chennai", aqi: 78, level: "Moderate", color: "text-yellow-600" }
  ];

  const todayChallenges = [
    { 
      title: "Energy Saver", 
      description: "Switch off lights for 2 hours",
      progress: 75,
      icon: Sun,
      timeLeft: "3 hours left"
    },
    { 
      title: "Water Conservation", 
      description: "Collect rainwater in a bucket",
      progress: 0,
      icon: Droplets,
      timeLeft: "All day"
    }
  ];

  const levelProgress = (currentPoints % 500) / 5; // Progress within current level

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Welcome back, {studentStats.name}! 🌱
            </h1>
            <p className="text-muted-foreground">
              {studentStats.school} • {studentStats.grade}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Zap className="h-3 w-3" />
              {studentStats.weeklyStreak} day streak
            </Badge>
            <Badge className="eco-gradient text-white">
              Rank #{studentStats.rank}
            </Badge>
          </div>
        </div>

        {/* Level Progress */}
        <Card className="eco-gradient text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Current Level: {currentLevel}</h3>
                <p className="opacity-90">{currentPoints} eco-points earned</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{nextLevelPoints - (currentPoints % 500)}</div>
                <div className="text-sm opacity-90">points to next level</div>
              </div>
            </div>
            <Progress value={levelProgress} className="h-3 bg-white/20" />
            <div className="flex justify-between text-sm opacity-90 mt-2">
              <span>Beginner: 0-100</span>
              <span>Intermediate: 100-500</span>
              <span>Advanced: 500-1000</span>
              <span>Expert: 1000+</span>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{studentStats.quizzesCompleted}</div>
              <div className="text-sm text-muted-foreground">Quizzes Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 mx-auto mb-2 text-success" />
              <div className="text-2xl font-bold">{studentStats.challengesCompleted}</div>
              <div className="text-sm text-muted-foreground">Challenges Done</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Award className="h-8 w-8 mx-auto mb-2 text-warning" />
              <div className="text-2xl font-bold">{studentStats.badgesEarned}</div>
              <div className="text-sm text-muted-foreground">Badges Earned</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-secondary" />
              <div className="text-2xl font-bold">#{studentStats.rank}</div>
              <div className="text-sm text-muted-foreground">School Rank</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Earn points and climb the leaderboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto p-4 justify-start hover:nature-shadow eco-transition"
                      onClick={action.action}
                    >
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${action.color}`}>
                        <action.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">{action.title}</div>
                        <div className="text-sm text-muted-foreground">{action.description}</div>
                        <div className="text-xs text-primary font-medium">{action.points}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Today's Challenges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-success" />
                  Today's Challenges
                </CardTitle>
                <CardDescription>
                  Complete these to earn extra points
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {todayChallenges.map((challenge, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="h-10 w-10 bg-success/10 rounded-full flex items-center justify-center">
                      <challenge.icon className="h-5 w-5 text-success" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{challenge.title}</div>
                      <div className="text-sm text-muted-foreground mb-2">{challenge.description}</div>
                      <div className="flex items-center gap-2">
                        <Progress value={challenge.progress} className="flex-1 h-2" />
                        <span className="text-xs text-muted-foreground">{challenge.progress}%</span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {challenge.timeLeft}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Environmental Data */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Indian Cities Air Quality
                </CardTitle>
                <CardDescription>
                  Real-time environmental data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {environmentalData.map((city, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{city.city}</div>
                        <div className={`text-sm ${city.color}`}>{city.level}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${city.color}`}>{city.aqi}</div>
                        <div className="text-xs text-muted-foreground">AQI</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Streak Counter */}
            <StreakCounter 
              currentStreak={12}
              bestStreak={18}
              weeklyGoal={7}
              monthlyGoal={30}
              streakRewards={[
                { day: 7, reward: "50 bonus points", claimed: true },
                { day: 14, reward: "Tree Protector badge", claimed: true },
                { day: 21, reward: "100 bonus points", claimed: false },
                { day: 30, reward: "Streak Master title", claimed: false }
              ]}
            />

            {/* Daily Reward Wheel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-primary" />
                  Daily Rewards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-3">
                  <div className="text-sm text-muted-foreground">
                    Spin the wheel for bonus rewards!
                  </div>
                  <Button 
                    className="w-full eco-gradient"
                    onClick={() => setSelectedTab("rewards")}
                  >
                    <Gift className="h-4 w-4 mr-2" />
                    Open Reward Wheel
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Team Invitation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Join a Team
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-3">
                  <div className="text-sm text-muted-foreground">
                    Team up for group challenges!
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setSelectedTab("teams")}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Explore Teams
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  This Week
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Points Earned</span>
                  <span className="font-bold text-primary">+320</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Quizzes Taken</span>
                  <span className="font-bold">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Challenges Done</span>
                  <span className="font-bold">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>School Rank</span>
                  <span className="font-bold text-success">↑ 3 positions</span>
                </div>
              </CardContent>
            </Card>

            {/* Badge Collection Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Badge Collection</CardTitle>
                <CardDescription>
                  8 out of 25 badges earned
                </CardDescription>
              </CardHeader>
              <CardContent>
                <img 
                  src={ecoBadges} 
                  alt="Badge Collection" 
                  className="w-full rounded-lg mb-4"
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => navigate('/profile')}
                >
                  View Full Collection
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
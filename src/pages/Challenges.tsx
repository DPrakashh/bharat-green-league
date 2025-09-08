import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Target, 
  Camera, 
  Clock, 
  Users, 
  Leaf,
  Droplets,
  Sun,
  Recycle,
  TreePine,
  Wind,
  Zap,
  Upload,
  CheckCircle,
  Calendar,
  Star,
  Trophy
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Challenge {
  id: number;
  title: string;
  description: string;
  icon: any;
  points: number;
  difficulty: "Easy" | "Medium" | "Hard";
  duration: string;
  category: string;
  participants: number;
  deadline: string;
  status: "available" | "in-progress" | "completed";
  progress?: number;
  photoRequired: boolean;
  color: string;
}

const Challenges = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("available");
  const [uploadingPhoto, setUploadingPhoto] = useState<number | null>(null);

  const challenges: Challenge[] = [
    {
      id: 1,
      title: "Plant a Tree in Your Locality",
      description: "Plant a sapling in your neighborhood and share a photo with location. Help increase green cover in your area.",
      icon: TreePine,
      points: 100,
      difficulty: "Medium",
      duration: "1 week",
      category: "Tree Plantation",
      participants: 2340,
      deadline: "Dec 15, 2024",
      status: "available",
      photoRequired: true,
      color: "text-green-600"
    },
    {
      id: 2,
      title: "Waste Segregation Drive",
      description: "Organize waste segregation in your home for 7 days. Take before/after photos showing proper segregation.",
      icon: Recycle,
      points: 75,
      difficulty: "Easy",
      duration: "1 week",
      category: "Waste Management",
      participants: 1890,
      deadline: "Dec 20, 2024",
      status: "in-progress",
      progress: 60,
      photoRequired: true,
      color: "text-emerald-600"
    },
    {
      id: 3,
      title: "Rainwater Harvesting Setup",
      description: "Set up a simple rainwater collection system at home. Document the setup process and measure collection.",
      icon: Droplets,
      points: 150,
      difficulty: "Hard",
      duration: "2 weeks",
      category: "Water Conservation",
      participants: 567,
      deadline: "Jan 10, 2025",
      status: "available",
      photoRequired: true,
      color: "text-blue-600"
    },
    {
      id: 4,
      title: "Energy Saving Week",
      description: "Reduce electricity consumption by 20% for one week. Track usage and share your conservation strategies.",
      icon: Sun,
      points: 80,
      difficulty: "Medium",
      duration: "1 week",
      category: "Energy Conservation",
      participants: 3200,
      deadline: "Dec 25, 2024",
      status: "available",
      photoRequired: false,
      color: "text-yellow-600"
    },
    {
      id: 5,
      title: "Plastic-Free Day Campaign",
      description: "Go completely plastic-free for 24 hours. Document alternatives used and create awareness content.",
      icon: Wind,
      points: 60,
      difficulty: "Easy",
      duration: "1 day",
      category: "Pollution Control",
      participants: 4100,
      deadline: "Dec 12, 2024",
      status: "completed",
      progress: 100,
      photoRequired: true,
      color: "text-sky-600"
    },
    {
      id: 6,
      title: "Community Clean-Up Drive",
      description: "Organize a neighborhood cleaning drive with friends. Collect and properly dispose of litter in public spaces.",
      icon: Users,
      points: 120,
      difficulty: "Medium",
      duration: "1 day",
      category: "Community Service",
      participants: 890,
      deadline: "Dec 30, 2024",
      status: "available",
      photoRequired: true,
      color: "text-purple-600"
    }
  ];

  const availableChallenges = challenges.filter(c => c.status === "available");
  const inProgressChallenges = challenges.filter(c => c.status === "in-progress");
  const completedChallenges = challenges.filter(c => c.status === "completed");

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-700";
      case "Medium": return "bg-yellow-100 text-yellow-700";
      case "Hard": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const handleStartChallenge = (challengeId: number) => {
    // In a real app, this would start the challenge
    console.log("Starting challenge:", challengeId);
  };

  const handlePhotoUpload = (challengeId: number) => {
    setUploadingPhoto(challengeId);
    // Simulate photo upload
    setTimeout(() => {
      setUploadingPhoto(null);
      // Show success message
    }, 2000);
  };

  const ChallengeCard = ({ challenge }: { challenge: Challenge }) => (
    <Card key={challenge.id} className="hover:nature-shadow eco-transition">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-success/20 flex items-center justify-center`}>
              <challenge.icon className={`h-6 w-6 ${challenge.color}`} />
            </div>
            <div>
              <CardTitle className="text-lg">{challenge.title}</CardTitle>
              <CardDescription className="mt-1">{challenge.category}</CardDescription>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-primary">+{challenge.points}</div>
            <div className="text-xs text-muted-foreground">points</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {challenge.description}
        </p>

        {challenge.status === "in-progress" && challenge.progress !== undefined && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{challenge.progress}%</span>
            </div>
            <Progress value={challenge.progress} className="h-2" />
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className={getDifficultyColor(challenge.difficulty)}>
            {challenge.difficulty}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {challenge.duration}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {challenge.participants.toLocaleString()}
          </Badge>
          {challenge.photoRequired && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Camera className="h-3 w-3" />
              Photo Required
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            Deadline: {challenge.deadline}
          </div>
          {challenge.status === "completed" && (
            <div className="flex items-center gap-1 text-success">
              <CheckCircle className="h-3 w-3" />
              Completed
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {challenge.status === "available" && (
            <Button 
              onClick={() => handleStartChallenge(challenge.id)}
              className="flex-1 eco-gradient"
            >
              <Target className="h-4 w-4 mr-2" />
              Start Challenge
            </Button>
          )}
          
          {challenge.status === "in-progress" && (
            <>
              {challenge.photoRequired && (
                <Button 
                  onClick={() => handlePhotoUpload(challenge.id)}
                  disabled={uploadingPhoto === challenge.id}
                  variant="outline" 
                  className="flex-1"
                >
                  {uploadingPhoto === challenge.id ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full mr-2" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photo
                    </>
                  )}
                </Button>
              )}
              <Button variant="outline" size="sm">
                View Progress
              </Button>
            </>
          )}

          {challenge.status === "completed" && (
            <Button variant="outline" className="flex-1" disabled>
              <CheckCircle className="h-4 w-4 mr-2" />
              Completed
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

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
              <Target className="h-8 w-8 text-primary" />
              Eco Challenges Hub
            </h1>
            <p className="text-muted-foreground">
              Take real-world environmental challenges and earn points
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              Weekly Rewards
            </Badge>
            <Badge className="eco-gradient text-white">
              <Trophy className="h-3 w-3 mr-1" />
              Top Challenger
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">2</div>
              <div className="text-sm text-muted-foreground">Active Challenges</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-success" />
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Zap className="h-8 w-8 mx-auto mb-2 text-warning" />
              <div className="text-2xl font-bold">480</div>
              <div className="text-sm text-muted-foreground">Points Earned</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-secondary" />
              <div className="text-2xl font-bold">#15</div>
              <div className="text-sm text-muted-foreground">Challenger Rank</div>
            </CardContent>
          </Card>
        </div>

        {/* Challenge Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="available" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Available ({availableChallenges.length})
            </TabsTrigger>
            <TabsTrigger value="in-progress" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              In Progress ({inProgressChallenges.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Completed ({completedChallenges.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableChallenges.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="in-progress" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inProgressChallenges.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedChallenges.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Weekly Spotlight */}
        <Card className="eco-gradient text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <Star className="h-6 w-6 text-yellow-300" />
                  Weekly Spotlight Challenge
                </h3>
                <p className="text-lg opacity-90 mb-2">Community Clean-Up Drive</p>
                <p className="opacity-80 mb-4">
                  Join thousands of students across India in the biggest community cleanup event. 
                  Double points this week!
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Trophy className="h-4 w-4" />
                    240 points
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    15,000+ participants
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    5 days left
                  </div>
                </div>
              </div>
              <Button variant="secondary" size="lg">
                Join Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Challenge Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Challenge Categories</CardTitle>
            <CardDescription>
              Explore different types of environmental challenges
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: "Tree Plantation", icon: TreePine, count: 12, color: "text-green-600" },
                { name: "Water Conservation", icon: Droplets, count: 8, color: "text-blue-600" },
                { name: "Energy Saving", icon: Sun, count: 10, color: "text-yellow-600" },
                { name: "Waste Management", icon: Recycle, count: 15, color: "text-emerald-600" },
                { name: "Air Quality", icon: Wind, count: 6, color: "text-sky-600" },
                { name: "Community Service", icon: Users, count: 9, color: "text-purple-600" }
              ].map((category, index) => (
                <div key={index} className="text-center p-4 border rounded-lg hover:bg-muted/50 eco-transition cursor-pointer">
                  <category.icon className={`h-8 w-8 mx-auto mb-2 ${category.color}`} />
                  <div className="font-medium text-sm">{category.name}</div>
                  <div className="text-xs text-muted-foreground">{category.count} challenges</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Challenges;
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Plus, 
  Search, 
  Crown, 
  Target,
  Trophy,
  Star,
  UserPlus,
  Settings,
  MessageCircle,
  Calendar,
  Award,
  Leaf,
  Zap
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Team {
  id: number;
  name: string;
  description: string;
  members: {
    id: number;
    name: string;
    level: string;
    points: number;
    role: "leader" | "member";
    avatar?: string;
  }[];
  totalPoints: number;
  rank: number;
  currentChallenge?: string;
  completedChallenges: number;
  achievements: string[];
  isJoined: boolean;
}

const TeamFormation = () => {
  const [selectedTab, setSelectedTab] = useState("my-team");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateTeam, setShowCreateTeam] = useState(false);

  const myTeam: Team = {
    id: 1,
    name: "Green Warriors",
    description: "Dedicated to protecting our environment through collective action and learning.",
    members: [
      { id: 1, name: "Rajesh Kumar", level: "Expert", points: 2340, role: "leader" },
      { id: 2, name: "Priya Sharma", level: "Advanced", points: 1890, role: "member" },
      { id: 3, name: "Divya Prakash", level: "Advanced", points: 1756, role: "member" },
      { id: 4, name: "Sneha Singh", level: "Intermediate", points: 1234, role: "member" }
    ],
    totalPoints: 7220,
    rank: 5,
    currentChallenge: "Community Clean-Up Drive",
    completedChallenges: 12,
    achievements: ["Eco Champions", "Tree Protectors", "Water Guardians"],
    isJoined: true
  };

  const availableTeams: Team[] = [
    {
      id: 2,
      name: "Earth Guardians",
      description: "Passionate about climate action and renewable energy initiatives.",
      members: [
        { id: 5, name: "Vikram Reddy", level: "Expert", points: 2890, role: "leader" },
        { id: 6, name: "Anita Gupta", level: "Advanced", points: 2100, role: "member" },
        { id: 7, name: "Rohit Jain", level: "Intermediate", points: 1567, role: "member" }
      ],
      totalPoints: 8956,
      rank: 2,
      completedChallenges: 18,
      achievements: ["Solar Champions", "Climate Warriors", "Energy Savers"],
      isJoined: false
    },
    {
      id: 3,
      name: "Eco Innovators",
      description: "Focus on finding innovative solutions to environmental challenges.",
      members: [
        { id: 8, name: "Meera Das", level: "Expert", points: 2567, role: "leader" },
        { id: 9, name: "Karthik Nair", level: "Advanced", points: 1890, role: "member" },
        { id: 10, name: "Deepika Roy", level: "Advanced", points: 1743, role: "member" },
        { id: 11, name: "Abhishek Jha", level: "Intermediate", points: 1456, role: "member" },
        { id: 12, name: "Pooja Mishra", level: "Intermediate", points: 1234, role: "member" }
      ],
      totalPoints: 8890,
      rank: 3,
      completedChallenges: 15,
      achievements: ["Innovation Leaders", "Tech for Good", "Future Builders"],
      isJoined: false
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert": return "text-yellow-600 bg-yellow-100";
      case "Advanced": return "text-purple-600 bg-purple-100";
      case "Intermediate": return "text-blue-600 bg-blue-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const TeamCard = ({ team, isMyTeam = false }: { team: Team; isMyTeam?: boolean }) => (
    <Card className="hover:nature-shadow eco-transition">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {isMyTeam && <Crown className="h-5 w-5 text-warning" />}
              {team.name}
              {team.rank <= 3 && (
                <Badge className={`${
                  team.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                  team.rank === 2 ? 'bg-gray-100 text-gray-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  #{team.rank}
                </Badge>
              )}
            </CardTitle>
            <CardDescription className="mt-1">
              {team.description}
            </CardDescription>
          </div>
          {isMyTeam && (
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Team Stats */}
        <div className="grid grid-cols-3 gap-4 p-3 bg-muted/30 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{team.totalPoints.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Total Points</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-success">{team.members.length}/6</div>
            <div className="text-xs text-muted-foreground">Members</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-warning">{team.completedChallenges}</div>
            <div className="text-xs text-muted-foreground">Challenges</div>
          </div>
        </div>

        {/* Current Challenge */}
        {team.currentChallenge && (
          <div className="p-3 border rounded-lg bg-gradient-to-r from-primary/5 to-success/5">
            <div className="flex items-center gap-2 mb-1">
              <Target className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">Current Challenge</span>
            </div>
            <div className="text-sm text-muted-foreground">{team.currentChallenge}</div>
          </div>
        )}

        {/* Team Members */}
        <div>
          <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
            <Users className="h-4 w-4" />
            Team Members
          </h4>
          <div className="space-y-2">
            {team.members.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm truncate">{member.name}</span>
                    {member.role === "leader" && (
                      <Crown className="h-3 w-3 text-warning" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getLevelColor(member.level)} text-xs`}>
                      {member.level}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {member.points.toLocaleString()} pts
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
            {team.members.length < 6 && !isMyTeam && (
              <div className="p-2 border-2 border-dashed border-muted rounded-lg text-center">
                <div className="text-sm text-muted-foreground">
                  {6 - team.members.length} spots available
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Team Achievements */}
        <div>
          <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
            <Award className="h-4 w-4 text-warning" />
            Team Achievements
          </h4>
          <div className="flex flex-wrap gap-1">
            {team.achievements.map((achievement, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {achievement}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          {isMyTeam ? (
            <>
              <Button variant="outline" size="sm" className="flex-1">
                <MessageCircle className="h-4 w-4 mr-2" />
                Team Chat
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Calendar className="h-4 w-4 mr-2" />
                Challenges
              </Button>
            </>
          ) : (
            <Button className="w-full eco-gradient" size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              Request to Join
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            Team Challenges
          </h2>
          <p className="text-muted-foreground">
            Join forces with classmates to tackle environmental challenges together
          </p>
        </div>
        <Button 
          onClick={() => setShowCreateTeam(true)}
          className="eco-gradient"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Team
        </Button>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="my-team">My Team</TabsTrigger>
          <TabsTrigger value="discover">Discover Teams</TabsTrigger>
          <TabsTrigger value="leaderboard">Team Rankings</TabsTrigger>
        </TabsList>

        <TabsContent value="my-team" className="space-y-6">
          {myTeam ? (
            <>
              <TeamCard team={myTeam} isMyTeam={true} />
              
              {/* Team Activity Feed */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Recent Team Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { user: "Priya Sharma", action: "completed Water Conservation Quiz", points: 20, time: "2 hours ago" },
                      { user: "Divya Prakash", action: "planted 5 trees for team challenge", points: 50, time: "5 hours ago" },
                      { user: "Sneha Singh", action: "earned Tree Protector badge", points: 100, time: "1 day ago" },
                      { user: "Team", action: "completed Community Clean-Up Drive", points: 200, time: "2 days ago" }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                        <Avatar className="h-8 w-8 bg-primary/10">
                          <AvatarFallback className="text-xs text-primary">
                            {activity.user === "Team" ? "🏆" : activity.user.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">{activity.user}</span> {activity.action}
                          </p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-success">+{activity.points}</div>
                          <div className="text-xs text-muted-foreground">points</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="text-center p-8">
              <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No Team Yet</h3>
              <p className="text-muted-foreground mb-4">
                Join a team or create your own to participate in group challenges
              </p>
              <Button className="eco-gradient">
                <Plus className="h-4 w-4 mr-2" />
                Find a Team
              </Button>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="discover" className="space-y-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search teams by name or interests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {availableTeams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-warning" />
                Team Leaderboard
              </CardTitle>
              <CardDescription>
                Top performing teams this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Climate Heroes", points: 12450, members: 6, rank: 1, change: 0 },
                  { name: "Earth Guardians", points: 8956, members: 3, rank: 2, change: 1 },
                  { name: "Eco Innovators", points: 8890, members: 5, rank: 3, change: -1 },
                  { name: "Nature Defenders", points: 7856, members: 4, rank: 4, change: 2 },
                  { name: "Green Warriors", points: 7220, members: 4, rank: 5, change: -1 }
                ].map((team, index) => (
                  <div key={index} className={`flex items-center gap-4 p-4 rounded-lg border ${
                    team.name === "Green Warriors" ? 'bg-primary/5 border-primary/20' : ''
                  }`}>
                    <div className="flex-shrink-0 w-8 text-center">
                      {team.rank <= 3 ? (
                        team.rank === 1 ? <Crown className="h-6 w-6 text-yellow-500 mx-auto" /> :
                        team.rank === 2 ? <Trophy className="h-6 w-6 text-gray-400 mx-auto" /> :
                        <Award className="h-6 w-6 text-amber-600 mx-auto" />
                      ) : (
                        <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-sm font-bold">
                          {team.rank}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="font-semibold">{team.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {team.members} members
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold text-primary">
                        {team.points.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">points</div>
                    </div>
                    
                    <div className="text-xs">
                      {team.change > 0 && <span className="text-success">↑{team.change}</span>}
                      {team.change < 0 && <span className="text-destructive">↓{Math.abs(team.change)}</span>}
                      {team.change === 0 && <span className="text-muted-foreground">-</span>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamFormation;
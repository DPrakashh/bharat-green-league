import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import confetti from "canvas-confetti";
import { 
  Target, 
  Trophy, 
  Star, 
  Gift,
  Crown,
  Award,
  Zap,
  Sparkles,
  Calendar,
  Clock,
  CheckCircle,
  Lock
} from "lucide-react";

interface Milestone {
  id: number;
  title: string;
  description: string;
  targetPoints: number;
  rewards: {
    points?: number;
    badge?: string;
    title?: string;
    special?: string;
  };
  icon: any;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  category: "Learning" | "Community" | "Achievement" | "Special";
  isCompleted: boolean;
  completedDate?: string;
  isActive?: boolean;
}

const MilestoneRewards = ({ currentPoints = 1850 }: { currentPoints?: number }) => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebratingMilestone, setCelebratingMilestone] = useState<Milestone | null>(null);

  const milestones: Milestone[] = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first environmental quiz",
      targetPoints: 10,
      rewards: { points: 50, badge: "Eco Beginner" },
      icon: Star,
      rarity: "Common",
      category: "Learning",
      isCompleted: true,
      completedDate: "Oct 15, 2024"
    },
    {
      id: 2,
      title: "Knowledge Seeker",
      description: "Earn 100 eco-points through learning",
      targetPoints: 100,
      rewards: { points: 100, badge: "Learning Enthusiast" },
      icon: Target,
      rarity: "Common",
      category: "Learning",
      isCompleted: true,
      completedDate: "Oct 22, 2024"
    },
    {
      id: 3,
      title: "Eco Warrior",
      description: "Reach 500 eco-points and complete 3 challenges",
      targetPoints: 500,
      rewards: { points: 200, badge: "Eco Warrior", title: "Environmental Champion" },
      icon: Award,
      rarity: "Rare",
      category: "Achievement",
      isCompleted: true,
      completedDate: "Nov 5, 2024"
    },
    {
      id: 4,
      title: "Community Leader",
      description: "Join a team and complete group challenges",
      targetPoints: 1000,
      rewards: { points: 300, badge: "Team Player", special: "Team Captain Badge" },
      icon: Trophy,
      rarity: "Rare",
      category: "Community",
      isCompleted: true,
      completedDate: "Nov 12, 2024"
    },
    {
      id: 5,
      title: "Environmental Scholar",
      description: "Reach 1500 eco-points with 90%+ quiz accuracy",
      targetPoints: 1500,
      rewards: { points: 400, badge: "Eco Scholar", title: "Environmental Expert" },
      icon: Crown,
      rarity: "Epic",
      category: "Achievement",
      isCompleted: true,
      completedDate: "Nov 18, 2024"
    },
    {
      id: 6,
      title: "Planet Guardian",
      description: "Achieve 2000 eco-points and mentor junior students",
      targetPoints: 2000,
      rewards: { points: 500, badge: "Planet Guardian", special: "Mentor Status" },
      icon: Crown,
      rarity: "Epic",
      category: "Special",
      isCompleted: false,
      isActive: true
    },
    {
      id: 7,
      title: "Eco Legend",
      description: "Reach 3000 eco-points and lead school environmental initiatives",
      targetPoints: 3000,
      rewards: { points: 1000, badge: "Eco Legend", title: "Climate Champion", special: "Hall of Fame" },
      icon: Sparkles,
      rarity: "Legendary",
      category: "Special",
      isCompleted: false
    },
    {
      id: 8,
      title: "Global Impact",
      description: "Achieve 5000 eco-points and inspire 50+ students to join",
      targetPoints: 5000,
      rewards: { points: 2000, badge: "Global Influencer", special: "Featured on Platform" },
      icon: Gift,
      rarity: "Legendary",
      category: "Special",
      isCompleted: false
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common": return { bg: "from-gray-400 to-gray-600", text: "text-gray-700 bg-gray-100" };
      case "Rare": return { bg: "from-blue-400 to-blue-600", text: "text-blue-700 bg-blue-100" };
      case "Epic": return { bg: "from-purple-400 to-purple-600", text: "text-purple-700 bg-purple-100" };
      case "Legendary": return { bg: "from-yellow-400 to-yellow-600", text: "text-yellow-700 bg-yellow-100" };
      default: return { bg: "from-gray-400 to-gray-600", text: "text-gray-700 bg-gray-100" };
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Learning": return "text-blue-600 bg-blue-100";
      case "Community": return "text-green-600 bg-green-100";
      case "Achievement": return "text-purple-600 bg-purple-100";
      case "Special": return "text-yellow-600 bg-yellow-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const triggerCelebration = (milestone: Milestone) => {
    setCelebratingMilestone(milestone);
    setShowCelebration(true);
    
    // Confetti celebration
    const colors = ['#10B981', '#059669', '#34D399', '#6EE7B7'];
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors
    });

    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 120,
        origin: { y: 0.6 },
        colors
      });
    }, 200);
  };

  const nextMilestone = milestones.find(m => !m.isCompleted);
  const completedMilestones = milestones.filter(m => m.isCompleted).length;
  const totalMilestones = milestones.length;
  const progressPercentage = (completedMilestones / totalMilestones) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            Milestone Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Overall Progress</span>
            <span className="text-primary font-bold">
              {completedMilestones}/{totalMilestones} Completed
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="text-center p-3 bg-success/10 rounded-lg">
              <div className="text-2xl font-bold text-success">{currentPoints.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Current Points</div>
            </div>
            <div className="text-center p-3 bg-primary/10 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {nextMilestone ? nextMilestone.targetPoints - currentPoints : 0}
              </div>
              <div className="text-sm text-muted-foreground">Points to Next</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Milestone Spotlight */}
      {nextMilestone && (
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-success/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Next Milestone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <div className={`h-16 w-16 rounded-full bg-gradient-to-br ${getRarityColor(nextMilestone.rarity).bg} flex items-center justify-center flex-shrink-0`}>
                <nextMilestone.icon className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold">{nextMilestone.title}</h3>
                  <Badge className={getRarityColor(nextMilestone.rarity).text}>
                    {nextMilestone.rarity}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-3">{nextMilestone.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{Math.min(currentPoints, nextMilestone.targetPoints)}/{nextMilestone.targetPoints}</span>
                  </div>
                  <Progress 
                    value={Math.min((currentPoints / nextMilestone.targetPoints) * 100, 100)} 
                    className="h-2" 
                  />
                </div>

                <div className="mt-4 p-3 bg-white/50 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Rewards:</h4>
                  <div className="flex flex-wrap gap-2">
                    {nextMilestone.rewards.points && (
                      <Badge variant="outline">+{nextMilestone.rewards.points} points</Badge>
                    )}
                    {nextMilestone.rewards.badge && (
                      <Badge variant="outline">🏆 {nextMilestone.rewards.badge}</Badge>
                    )}
                    {nextMilestone.rewards.title && (
                      <Badge variant="outline">👑 {nextMilestone.rewards.title}</Badge>
                    )}
                    {nextMilestone.rewards.special && (
                      <Badge variant="outline">⭐ {nextMilestone.rewards.special}</Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-warning" />
            All Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-4 border rounded-lg eco-transition ${
                  milestone.isCompleted 
                    ? 'bg-success/5 border-success/20' 
                    : milestone.isActive
                      ? 'bg-primary/5 border-primary/20'
                      : 'bg-muted/30 border-muted'
                }`}
              >
                {/* Status Icon */}
                <div className="absolute top-4 right-4">
                  {milestone.isCompleted ? (
                    <CheckCircle className="h-6 w-6 text-success" />
                  ) : currentPoints >= milestone.targetPoints ? (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Sparkles className="h-6 w-6 text-warning" />
                    </motion.div>
                  ) : (
                    <Lock className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>

                <div className="flex items-start gap-4 pr-12">
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    milestone.isCompleted 
                      ? `bg-gradient-to-br ${getRarityColor(milestone.rarity).bg}` 
                      : 'bg-muted'
                  }`}>
                    <milestone.icon className={`h-6 w-6 ${
                      milestone.isCompleted ? 'text-white' : 'text-muted-foreground'
                    }`} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{milestone.title}</h4>
                      <Badge className={getCategoryColor(milestone.category)} variant="secondary">
                        {milestone.category}
                      </Badge>
                      <Badge className={getRarityColor(milestone.rarity).text}>
                        {milestone.rarity}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {milestone.description}
                    </p>

                    {milestone.isCompleted ? (
                      <div className="text-sm text-success font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Completed on {milestone.completedDate}
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        Target: {milestone.targetPoints.toLocaleString()} points
                      </div>
                    )}

                    {/* Rewards Preview */}
                    <div className="mt-3 p-2 bg-muted/30 rounded text-xs">
                      <span className="font-medium">Rewards: </span>
                      {milestone.rewards.points && <span>+{milestone.rewards.points} pts </span>}
                      {milestone.rewards.badge && <span>🏆 {milestone.rewards.badge} </span>}
                      {milestone.rewards.title && <span>👑 {milestone.rewards.title} </span>}
                      {milestone.rewards.special && <span>⭐ {milestone.rewards.special}</span>}
                    </div>

                    {/* Claim Button */}
                    {!milestone.isCompleted && currentPoints >= milestone.targetPoints && (
                      <Button
                        onClick={() => triggerCelebration(milestone)}
                        size="sm"
                        className="mt-3 eco-gradient"
                      >
                        <Gift className="h-4 w-4 mr-2" />
                        Claim Reward
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Celebration Modal */}
      <AnimatePresence>
        {showCelebration && celebratingMilestone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative z-10 w-full max-w-md mx-4"
            >
              <Card className="text-center overflow-hidden border-4 border-primary/20">
                <div className={`bg-gradient-to-br ${getRarityColor(celebratingMilestone.rarity).bg} p-6 text-white`}>
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <celebratingMilestone.icon className="h-16 w-16 mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">Milestone Achieved!</h3>
                  <Badge className="bg-white/20 text-white">
                    {celebratingMilestone.rarity}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold mb-2">{celebratingMilestone.title}</h4>
                  <p className="text-muted-foreground mb-4">
                    {celebratingMilestone.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    {celebratingMilestone.rewards.points && (
                      <div className="text-lg font-bold text-success">
                        +{celebratingMilestone.rewards.points} Eco Points!
                      </div>
                    )}
                    {celebratingMilestone.rewards.badge && (
                      <div className="text-primary">
                        🏆 {celebratingMilestone.rewards.badge} Badge Unlocked!
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    onClick={() => setShowCelebration(false)}
                    className="w-full eco-gradient"
                  >
                    Continue Learning!
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MilestoneRewards;
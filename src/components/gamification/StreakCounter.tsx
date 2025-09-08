import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Flame, 
  Calendar, 
  Star, 
  Trophy,
  Zap,
  Target,
  Crown
} from "lucide-react";

interface StreakCounterProps {
  currentStreak: number;
  bestStreak: number;
  weeklyGoal: number;
  monthlyGoal: number;
  streakRewards: {
    day: number;
    reward: string;
    claimed: boolean;
  }[];
}

const StreakCounter = ({ 
  currentStreak, 
  bestStreak, 
  weeklyGoal, 
  monthlyGoal,
  streakRewards
}: StreakCounterProps) => {
  const weeklyProgress = Math.min((currentStreak / weeklyGoal) * 100, 100);
  const monthlyProgress = Math.min((currentStreak / monthlyGoal) * 100, 100);

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return "text-yellow-500";
    if (streak >= 14) return "text-orange-500";
    if (streak >= 7) return "text-red-500";
    return "text-primary";
  };

  const getStreakEmoji = (streak: number) => {
    if (streak >= 30) return "👑";
    if (streak >= 14) return "🏆";
    if (streak >= 7) return "🔥";
    return "⭐";
  };

  const nextMilestone = streakRewards.find(reward => reward.day > currentStreak);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <motion.div
            animate={currentStreak > 0 ? { 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            } : {}}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Flame className={`h-5 w-5 ${getStreakColor(currentStreak)}`} />
          </motion.div>
          Learning Streak
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Streak Display */}
        <div className="text-center">
          <motion.div
            key={currentStreak}
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative"
          >
            <div className="text-4xl font-bold mb-1">
              <span className={getStreakColor(currentStreak)}>
                {currentStreak}
              </span>
              <span className="text-2xl ml-2">{getStreakEmoji(currentStreak)}</span>
            </div>
            <div className="text-muted-foreground">
              {currentStreak === 1 ? "day streak" : "days streak"}
            </div>
            
            {/* Flame animation background */}
            {currentStreak > 0 && (
              <motion.div
                className="absolute inset-0 -z-10"
                animate={{
                  background: [
                    "radial-gradient(circle, transparent 0%, transparent 100%)",
                    `radial-gradient(circle, ${getStreakColor(currentStreak)}10 0%, transparent 70%)`,
                    "radial-gradient(circle, transparent 0%, transparent 100%)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            )}
          </motion.div>
        </div>

        {/* Weekly & Monthly Progress */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Weekly Goal</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {Math.min(currentStreak, weeklyGoal)}/{weeklyGoal}
              </span>
            </div>
            <Progress value={weeklyProgress} className="h-2" />
            {weeklyProgress === 100 && (
              <Badge className="mt-2 bg-success/10 text-success">
                <Trophy className="h-3 w-3 mr-1" />
                Weekly Goal Achieved!
              </Badge>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-secondary" />
                <span className="text-sm font-medium">Monthly Challenge</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {Math.min(currentStreak, monthlyGoal)}/{monthlyGoal}
              </span>
            </div>
            <Progress value={monthlyProgress} className="h-2" />
            {monthlyProgress === 100 && (
              <Badge className="mt-2 bg-warning/10 text-warning">
                <Crown className="h-3 w-3 mr-1" />
                Monthly Champion!
              </Badge>
            )}
          </div>
        </div>

        {/* Streak Stats */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{bestStreak}</div>
            <div className="text-xs text-muted-foreground">Best Streak</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-success">{currentStreak * 10}</div>
            <div className="text-xs text-muted-foreground">Bonus Points</div>
          </div>
        </div>

        {/* Next Milestone */}
        {nextMilestone && (
          <div className="p-3 border rounded-lg bg-gradient-to-r from-primary/5 to-success/5">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm">Next Milestone</div>
                <div className="text-xs text-muted-foreground">
                  {nextMilestone.day - currentStreak} days to go
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-primary">
                  {nextMilestone.day} days
                </div>
                <div className="text-xs text-muted-foreground">
                  {nextMilestone.reward}
                </div>
              </div>
            </div>
            <Progress 
              value={((currentStreak % 7) / 7) * 100} 
              className="h-1 mt-2" 
            />
          </div>
        )}

        {/* Streak Rewards */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Star className="h-4 w-4 text-warning" />
            Streak Rewards
          </h4>
          <div className="space-y-1">
            {streakRewards.slice(0, 4).map((reward, index) => (
              <div 
                key={index}
                className={`flex items-center justify-between p-2 rounded text-sm ${
                  reward.claimed 
                    ? 'bg-success/10 text-success' 
                    : currentStreak >= reward.day
                      ? 'bg-warning/10 text-warning'
                      : 'bg-muted/30 text-muted-foreground'
                }`}
              >
                <span>{reward.day} days</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs">{reward.reward}</span>
                  {reward.claimed && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                    >
                      <Zap className="h-3 w-3" />
                    </motion.div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakCounter;
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import confetti from "canvas-confetti";
import { 
  RotateCcw, 
  Gift, 
  Star, 
  Trophy,
  Zap,
  Crown,
  Award,
  Sparkles,
  Ticket,
  Clock
} from "lucide-react";

interface RewardItem {
  id: number;
  label: string;
  points?: number;
  badge?: string;
  icon: any;
  color: string;
  probability: number;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
}

const RewardWheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<RewardItem | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [availableSpins, setAvailableSpins] = useState(3);
  const [timeUntilNextSpin, setTimeUntilNextSpin] = useState<string>("2h 34m");

  const rewards: RewardItem[] = [
    { id: 1, label: "50 Points", points: 50, icon: Star, color: "from-blue-400 to-blue-600", probability: 25, rarity: "Common" },
    { id: 2, label: "100 Points", points: 100, icon: Zap, color: "from-green-400 to-green-600", probability: 20, rarity: "Common" },
    { id: 3, label: "Energy Badge", badge: "Energy Champion", icon: Award, color: "from-yellow-400 to-yellow-600", probability: 15, rarity: "Rare" },
    { id: 4, label: "200 Points", points: 200, icon: Trophy, color: "from-purple-400 to-purple-600", probability: 10, rarity: "Rare" },
    { id: 5, label: "Eco Booster", points: 150, icon: Sparkles, color: "from-pink-400 to-pink-600", probability: 10, rarity: "Rare" },
    { id: 6, label: "Mystery Badge", badge: "Mystery Champion", icon: Gift, color: "from-indigo-400 to-indigo-600", probability: 8, rarity: "Epic" },
    { id: 7, label: "500 Points", points: 500, icon: Crown, color: "from-red-400 to-red-600", probability: 7, rarity: "Epic" },
    { id: 8, label: "Legend Badge", badge: "Eco Legend", icon: Crown, color: "from-yellow-500 to-orange-500", probability: 5, rarity: "Legendary" }
  ];

  const totalSegments = rewards.length;
  const segmentAngle = 360 / totalSegments;

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10B981', '#059669', '#34D399', '#6EE7B7']
    });
  };

  const spinWheel = () => {
    if (availableSpins <= 0 || isSpinning) return;

    setIsSpinning(true);
    setShowResult(false);
    setResult(null);

    // Calculate winning segment based on probability
    const random = Math.random() * 100;
    let cumulativeProbability = 0;
    let winningReward = rewards[0];

    for (const reward of rewards) {
      cumulativeProbability += reward.probability;
      if (random <= cumulativeProbability) {
        winningReward = reward;
        break;
      }
    }

    // Calculate the angle to land on the winning segment
    const winningIndex = rewards.findIndex(r => r.id === winningReward.id);
    const targetAngle = winningIndex * segmentAngle + (segmentAngle / 2);
    const spinAmount = 360 * 5 + targetAngle; // 5 full rotations plus target
    const newRotation = rotation + spinAmount;

    setRotation(newRotation);

    // Show result after animation
    setTimeout(() => {
      setIsSpinning(false);
      setResult(winningReward);
      setShowResult(true);
      setAvailableSpins(prev => prev - 1);
      triggerConfetti();
    }, 3000);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common": return "text-gray-600 bg-gray-100";
      case "Rare": return "text-blue-600 bg-blue-100";
      case "Epic": return "text-purple-600 bg-purple-100";
      case "Legendary": return "text-yellow-600 bg-yellow-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Gift className="h-6 w-6 text-primary" />
            Daily Reward Wheel
          </CardTitle>
          <div className="flex items-center justify-center gap-4 mt-2">
            <Badge className="flex items-center gap-1">
              <Ticket className="h-3 w-3" />
              {availableSpins} spins left
            </Badge>
            {availableSpins === 0 && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Next spin: {timeUntilNextSpin}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          {/* Wheel Container */}
          <div className="relative">
            {/* Pointer */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 z-10">
              <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-b-[20px] border-l-transparent border-r-transparent border-b-primary drop-shadow-lg" />
            </div>

            {/* Wheel */}
            <motion.div
              className="relative w-80 h-80 rounded-full border-8 border-primary shadow-2xl overflow-hidden"
              animate={{ rotate: rotation }}
              transition={{ 
                duration: isSpinning ? 3 : 0,
                ease: isSpinning ? "easeOut" : "linear"
              }}
            >
              {rewards.map((reward, index) => {
                const angle = index * segmentAngle;
                return (
                  <div
                    key={reward.id}
                    className={`absolute w-full h-full bg-gradient-to-r ${reward.color}`}
                    style={{
                      clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.sin((segmentAngle * Math.PI) / 180)}% ${50 - 50 * Math.cos((segmentAngle * Math.PI) / 180)}%)`,
                      transform: `rotate(${angle}deg)`,
                      transformOrigin: 'center center'
                    }}
                  >
                    <div 
                      className="absolute text-white font-bold text-xs flex flex-col items-center justify-center"
                      style={{
                        top: '20%',
                        left: '50%',
                        transform: `translate(-50%, -50%) rotate(${segmentAngle / 2}deg)`,
                        width: '80px',
                        height: '40px'
                      }}
                    >
                      <reward.icon className="h-4 w-4 mb-1" />
                      <span className="text-center leading-tight">{reward.label}</span>
                    </div>
                  </div>
                );
              })}
              
              {/* Center Circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full border-4 border-primary flex items-center justify-center shadow-lg">
                <RotateCcw className={`h-6 w-6 text-primary ${isSpinning ? 'animate-spin' : ''}`} />
              </div>
            </motion.div>
          </div>

          {/* Spin Button */}
          <Button
            onClick={spinWheel}
            disabled={availableSpins <= 0 || isSpinning}
            size="lg"
            className={`eco-gradient text-white font-bold py-3 px-8 ${
              isSpinning ? 'animate-pulse' : ''
            }`}
          >
            {isSpinning ? (
              <>
                <RotateCcw className="h-5 w-5 mr-2 animate-spin" />
                Spinning...
              </>
            ) : availableSpins > 0 ? (
              <>
                <Gift className="h-5 w-5 mr-2" />
                Spin to Win!
              </>
            ) : (
              <>
                <Clock className="h-5 w-5 mr-2" />
                No Spins Left
              </>
            )}
          </Button>

          {/* Reward Probabilities */}
          <div className="w-full">
            <h4 className="font-medium text-sm mb-3 text-center">Possible Rewards</h4>
            <div className="grid grid-cols-2 gap-2">
              {rewards.map((reward) => (
                <div key={reward.id} className="flex items-center justify-between p-2 rounded bg-muted/30">
                  <div className="flex items-center gap-2">
                    <reward.icon className="h-4 w-4 text-primary" />
                    <span className="text-sm">{reward.label}</span>
                  </div>
                  <Badge className={getRarityColor(reward.rarity)} variant="secondary">
                    {reward.probability}%
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Result Modal */}
      <AnimatePresence>
        {showResult && result && (
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
              className="relative z-10 w-full max-w-sm mx-4"
            >
              <Card className="text-center overflow-hidden border-4 border-primary/20">
                <div className={`bg-gradient-to-br ${result.color} p-6 text-white`}>
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <result.icon className="h-16 w-16 mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">Congratulations!</h3>
                  <Badge className={getRarityColor(result.rarity)} variant="secondary">
                    {result.rarity}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold mb-2">{result.label}</h4>
                  {result.points && (
                    <div className="text-2xl font-bold text-success mb-4">
                      +{result.points} Points!
                    </div>
                  )}
                  {result.badge && (
                    <div className="text-lg text-primary mb-4">
                      🏆 {result.badge} Badge Unlocked!
                    </div>
                  )}
                  <Button 
                    onClick={() => setShowResult(false)}
                    className="w-full eco-gradient"
                  >
                    Awesome!
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

export default RewardWheel;
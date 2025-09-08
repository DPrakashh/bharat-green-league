import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Award, 
  Star, 
  Trophy, 
  Share2, 
  Download,
  X,
  Sparkles
} from "lucide-react";

interface BadgeUnlockCeremonyProps {
  isOpen: boolean;
  onClose: () => void;
  badge: {
    name: string;
    description: string;
    icon: any;
    color: string;
    points: number;
    rarity: "Common" | "Rare" | "Epic" | "Legendary";
  };
  onShare?: () => void;
}

const BadgeUnlockCeremony = ({ isOpen, onClose, badge, onShare }: BadgeUnlockCeremonyProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common": return { bg: "from-gray-400 to-gray-600", text: "text-gray-700" };
      case "Rare": return { bg: "from-blue-400 to-blue-600", text: "text-blue-700" };
      case "Epic": return { bg: "from-purple-400 to-purple-600", text: "text-purple-700" };
      case "Legendary": return { bg: "from-yellow-400 to-yellow-600", text: "text-yellow-700" };
      default: return { bg: "from-gray-400 to-gray-600", text: "text-gray-700" };
    }
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  useEffect(() => {
    if (isOpen) {
      setAnimationPhase(0);
      const timer1 = setTimeout(() => setAnimationPhase(1), 500);
      const timer2 = setTimeout(() => {
        setAnimationPhase(2);
        triggerConfetti();
      }, 1000);
      const timer3 = setTimeout(() => setAnimationPhase(3), 1500);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isOpen]);

  const rarityColors = getRarityColor(badge.rarity);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Main Card */}
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ 
              scale: animationPhase >= 1 ? 1 : 0,
              rotate: animationPhase >= 1 ? 0 : -180,
              opacity: animationPhase >= 1 ? 1 : 0
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 20,
              duration: 0.8
            }}
            className="relative z-10 w-full max-w-md mx-4"
          >
            <Card className="overflow-hidden border-4 border-primary/20 shadow-2xl">
              {/* Header with sparkles */}
              <div className={`relative bg-gradient-to-br ${rarityColors.bg} p-6 text-white`}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="absolute top-2 right-2 text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
                
                {/* Animated sparkles */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={animationPhase >= 2 ? {
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        rotate: [0, 180, 360]
                      } : {}}
                      transition={{
                        duration: 2,
                        delay: i * 0.2,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                    >
                      <Sparkles className="h-4 w-4 text-yellow-200" />
                    </motion.div>
                  ))}
                </div>

                <div className="relative text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={animationPhase >= 2 ? { scale: 1 } : { scale: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-200" />
                  </motion.div>
                  <h2 className="text-xl font-bold">Badge Unlocked!</h2>
                  <Badge className="bg-white/20 text-white mt-2">
                    {badge.rarity}
                  </Badge>
                </div>
              </div>

              {/* Badge Display */}
              <div className="p-8 text-center bg-gradient-to-b from-background to-muted/30">
                <motion.div
                  initial={{ scale: 0, rotate: -360 }}
                  animate={animationPhase >= 1 ? { 
                    scale: 1, 
                    rotate: 0,
                  } : {}}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.3
                  }}
                  className="relative mb-6"
                >
                  <div className={`relative h-24 w-24 mx-auto rounded-full bg-gradient-to-br ${rarityColors.bg} p-6 shadow-lg`}>
                    <badge.icon className="h-full w-full text-white" />
                    
                    {/* Pulsing ring */}
                    <motion.div
                      className={`absolute inset-0 rounded-full border-4 ${rarityColors.bg.includes('yellow') ? 'border-yellow-400' : 'border-primary'}`}
                      animate={animationPhase >= 2 ? {
                        scale: [1, 1.2, 1],
                        opacity: [1, 0, 1]
                      } : {}}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={animationPhase >= 2 ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 }}
                >
                  <h3 className="text-2xl font-bold mb-2">{badge.name}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {badge.description}
                  </p>
                  
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={animationPhase >= 3 ? { scale: 1 } : {}}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full font-medium"
                  >
                    <Star className="h-4 w-4" />
                    +{badge.points} Eco Points Earned!
                  </motion.div>
                </motion.div>
              </div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={animationPhase >= 3 ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2 }}
                className="p-6 bg-muted/30 border-t"
              >
                <div className="flex gap-3">
                  <Button 
                    onClick={onShare}
                    className="flex-1 eco-gradient"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Achievement
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={onClose}
                  className="w-full mt-3"
                >
                  Continue Learning
                </Button>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BadgeUnlockCeremony;
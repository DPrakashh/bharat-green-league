import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Share2, 
  Copy, 
  Download,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MessageCircle,
  Heart,
  Eye,
  Award,
  Trophy,
  Star,
  Check
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: any;
  points: number;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  dateEarned: string;
  category: string;
}

interface SocialSharingProps {
  achievement: Achievement;
  studentName: string;
  schoolName: string;
  currentRank: number;
  totalPoints: number;
}

const SocialSharing = ({ 
  achievement, 
  studentName, 
  schoolName, 
  currentRank, 
  totalPoints 
}: SocialSharingProps) => {
  const [shareMethod, setShareMethod] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common": return "from-gray-400 to-gray-600";
      case "Rare": return "from-blue-400 to-blue-600";
      case "Epic": return "from-purple-400 to-purple-600";
      case "Legendary": return "from-yellow-400 to-yellow-600";
      default: return "from-gray-400 to-gray-600";
    }
  };

  const shareText = `🌱 Just earned the "${achievement.title}" badge on EcoLearn! 
🏆 Current rank: #${currentRank} 
⚡ Total eco-points: ${totalPoints.toLocaleString()}
🌍 Join me in learning about environmental conservation!
#EcoLearn #EnvironmentalEducation #ClimateAction`;

  const shareUrl = "https://ecolearn.edu/achievements/" + achievement.id;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
      setCopied(true);
      toast({
        title: "Copied to clipboard!",
        description: "Share your achievement with friends and family.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please copy the link manually.",
        variant: "destructive"
      });
    }
  };

  const handleSocialShare = (platform: string) => {
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);
    
    let shareLink = "";
    
    switch (platform) {
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
        break;
      case "linkedin":
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case "whatsapp":
        shareLink = `https://wa.me/?text=${encodedText} ${encodedUrl}`;
        break;
    }
    
    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400');
    }
  };

  const handleDownloadImage = () => {
    // Create a canvas to generate the achievement image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 600;
    canvas.height = 400;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#10B981');
    gradient.addColorStop(1, '#059669');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🏆 Achievement Unlocked!', canvas.width / 2, 80);
    
    ctx.font = 'bold 24px Arial';
    ctx.fillText(achievement.title, canvas.width / 2, 140);
    
    ctx.font = '18px Arial';
    ctx.fillText(studentName, canvas.width / 2, 180);
    ctx.fillText(schoolName, canvas.width / 2, 210);
    
    ctx.font = '16px Arial';
    ctx.fillText(`Rank #${currentRank} • ${totalPoints.toLocaleString()} points`, canvas.width / 2, 250);
    
    ctx.fillText('EcoLearn - Environmental Education Platform', canvas.width / 2, 350);

    // Download the image
    const link = document.createElement('a');
    link.download = `ecolearn-achievement-${achievement.title.replace(/\s+/g, '-').toLowerCase()}.png`;
    link.href = canvas.toDataURL();
    link.click();

    toast({
      title: "Achievement image downloaded!",
      description: "Share it on your social media platforms.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Achievement Preview Card */}
      <Card className="overflow-hidden">
        <div className={`bg-gradient-to-br ${getRarityColor(achievement.rarity)} p-6 text-white`}>
          <div className="flex items-center justify-between mb-4">
            <Badge className="bg-white/20 text-white">
              {achievement.rarity}
            </Badge>
            <div className="text-right">
              <div className="text-sm opacity-80">Earned</div>
              <div className="font-medium">{achievement.dateEarned}</div>
            </div>
          </div>
          
          <div className="text-center">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="mb-4"
            >
              <achievement.icon className="h-16 w-16 mx-auto" />
            </motion.div>
            <h3 className="text-2xl font-bold mb-2">{achievement.title}</h3>
            <p className="opacity-90 mb-4">{achievement.description}</p>
            <div className="text-xl font-bold">+{achievement.points} Points</div>
          </div>
        </div>
        
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary text-white font-bold">
                {studentName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">{studentName}</div>
              <div className="text-sm text-muted-foreground">{schoolName}</div>
              <div className="flex items-center gap-4 mt-1">
                <div className="flex items-center gap-1 text-sm text-primary">
                  <Trophy className="h-4 w-4" />
                  Rank #{currentRank}
                </div>
                <div className="flex items-center gap-1 text-sm text-success">
                  <Star className="h-4 w-4" />
                  {totalPoints.toLocaleString()} points
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Preview */}
          <div className="space-y-4">
            <h4 className="font-medium">Share Preview</h4>
            <div className="p-4 border rounded-lg bg-muted/30">
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-white text-sm">
                    {studentName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-medium text-sm">{studentName}</div>
                  <div className="text-xs text-muted-foreground mb-2">2 minutes ago</div>
                  <div className="text-sm leading-relaxed whitespace-pre-line">
                    {shareText}
                  </div>
                  
                  {/* Mock engagement */}
                  <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      24 likes
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      8 comments
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      156 views
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sharing Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-primary" />
            Share Your Achievement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Social Media Buttons */}
          <div>
            <h4 className="font-medium mb-3">Share on Social Media</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button
                variant="outline"
                onClick={() => handleSocialShare("facebook")}
                className="flex items-center gap-2 h-12"
              >
                <div className="h-5 w-5 bg-blue-600 rounded flex items-center justify-center">
                  <Facebook className="h-3 w-3 text-white" />
                </div>
                Facebook
              </Button>
              
              <Button
                variant="outline"
                onClick={() => handleSocialShare("twitter")}
                className="flex items-center gap-2 h-12"
              >
                <div className="h-5 w-5 bg-sky-500 rounded flex items-center justify-center">
                  <Twitter className="h-3 w-3 text-white" />
                </div>
                Twitter
              </Button>
              
              <Button
                variant="outline"
                onClick={() => handleSocialShare("linkedin")}
                className="flex items-center gap-2 h-12"
              >
                <div className="h-5 w-5 bg-blue-700 rounded flex items-center justify-center">
                  <Linkedin className="h-3 w-3 text-white" />
                </div>
                LinkedIn
              </Button>
              
              <Button
                variant="outline"
                onClick={() => handleSocialShare("whatsapp")}
                className="flex items-center gap-2 h-12"
              >
                <div className="h-5 w-5 bg-green-500 rounded flex items-center justify-center">
                  <MessageCircle className="h-3 w-3 text-white" />
                </div>
                WhatsApp
              </Button>
            </div>
          </div>

          {/* Copy Link */}
          <div>
            <h4 className="font-medium mb-3">Copy Link</h4>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleCopyLink}
                className="flex-1"
                disabled={copied}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2 text-success" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Achievement Link
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Download Image */}
          <div>
            <h4 className="font-medium mb-3">Download Achievement</h4>
            <Button
              variant="outline"
              onClick={handleDownloadImage}
              className="w-full"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Achievement Image
            </Button>
          </div>

          {/* Share Statistics */}
          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="font-medium mb-3">Sharing Impact</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-primary">12</div>
                <div className="text-xs text-muted-foreground">Friends Inspired</div>
              </div>
              <div>
                <div className="text-lg font-bold text-success">5</div>
                <div className="text-xs text-muted-foreground">New Sign-ups</div>
              </div>
              <div>
                <div className="text-lg font-bold text-warning">+50</div>
                <div className="text-xs text-muted-foreground">Bonus Points</div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              Earn bonus points when friends join EcoLearn through your shares!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialSharing;
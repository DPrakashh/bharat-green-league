import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Leaf, 
  Trophy, 
  Users, 
  Target, 
  BookOpen, 
  Award, 
  TreePine, 
  Droplets, 
  Wind,
  ArrowRight,
  Play
} from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import ecoLogo from "@/assets/eco-logo.png";

const Index = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const features = [
    {
      icon: BookOpen,
      title: language === 'en' ? "Interactive Quizzes" : "संवादात्मक प्रश्नोत्तरी",
      description: language === 'en' 
        ? "Learn about climate change, pollution, and sustainability through engaging quizzes"
        : "जलवायु परिवर्तन, प्रदूषण और स्थिरता के बारे में रोचक प्रश्नोत्तरी के माध्यम से सीखें"
    },
    {
      icon: Target,
      title: language === 'en' ? "Eco Challenges" : "पर्यावरण चुनौतियां",
      description: language === 'en'
        ? "Take real-world challenges like tree planting, waste management, and energy saving"
        : "वृक्षारोपण, अपशिष्ट प्रबंधन और ऊर्जा बचत जैसी वास्तविक चुनौतियां लें"
    },
    {
      icon: Trophy,
      title: language === 'en' ? "School Competition" : "स्कूल प्रतियोगिता",
      description: language === 'en'
        ? "Compete with other schools and climb the leaderboard rankings"
        : "अन्य स्कूलों के साथ प्रतिस्पर्धा करें और लीडरबोर्ड रैंकिंग में आगे बढ़ें"
    },
    {
      icon: Award,
      title: language === 'en' ? "Achievement Badges" : "उपलब्धि बैज",
      description: language === 'en'
        ? "Earn badges like Eco Warrior, Tree Protector, and Water Saver"
        : "इको वॉरियर, ट्री प्रोटेक्टर और वाटर सेवर जैसे बैज अर्जित करें"
    }
  ];

  const stats = [
    { number: "50,000+", label: language === 'en' ? "Students" : "छात्र", icon: Users },
    { number: "500+", label: language === 'en' ? "Schools" : "स्कूल", icon: TreePine },
    { number: "1M+", label: language === 'en' ? "Questions Answered" : "उत्तर दिए", icon: BookOpen },
    { number: "25,000+", label: language === 'en' ? "Trees Planted" : "पेड़ लगाए", icon: Leaf }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src={ecoLogo} alt="EcoLearn Logo" className="h-8 w-8" />
            <span className="text-xl font-bold eco-gradient bg-clip-text text-transparent">
              EcoLearn
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="text-sm"
            >
              {language === 'en' ? 'हिंदी' : 'English'}
            </Button>
            <Button variant="outline" onClick={() => navigate('/login')}>
              {language === 'en' ? 'Login' : 'लॉगिन'}
            </Button>
            <Button className="eco-gradient" onClick={() => navigate('/dashboard')}>
              {language === 'en' ? 'Get Started' : 'शुरू करें'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="eco-gradient text-white">
                  {language === 'en' ? '🇮🇳 Made for Indian Schools' : '🇮🇳 भारतीय स्कूलों के लिए बनाया गया'}
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                  {language === 'en' ? (
                    <>
                      Learn <span className="eco-gradient bg-clip-text text-transparent">Environment</span>
                      <br />
                      Save <span className="text-success">Our Planet</span>
                    </>
                  ) : (
                    <>
                      <span className="eco-gradient bg-clip-text text-transparent">पर्यावरण</span> सीखें
                      <br />
                      <span className="text-success">ग्रह को</span> बचाएं
                    </>
                  )}
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  {language === 'en' 
                    ? "India's first gamified environmental education platform. Learn, compete, and make a difference with your classmates!"
                    : "भारत का पहला गेमिफाइड पर्यावरण शिक्षा मंच। सीखें, प्रतिस्पर्धा करें, और अपने सहपाठियों के साथ बदलाव लाएं!"
                  }
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="eco-gradient glow-shadow" onClick={() => navigate('/dashboard')}>
                  <Play className="mr-2 h-5 w-5" />
                  {language === 'en' ? 'Start Learning' : 'सीखना शुरू करें'}
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/quiz')}>
                  {language === 'en' ? 'Take Quiz' : 'क्विज़ लें'}
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Students learning environmental science"
                className="rounded-2xl nature-shadow"
              />
              <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-4 nature-shadow">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 eco-gradient rounded-full flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">25,000+ {language === 'en' ? 'Trees' : 'पेड़'}</div>
                    <div className="text-sm text-muted-foreground">{language === 'en' ? 'Planted by students' : 'छात्रों द्वारा लगाए गए'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="h-12 w-12 eco-gradient rounded-full flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="text-2xl lg:text-3xl font-bold">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {language === 'en' ? 'Why Choose EcoLearn?' : 'EcoLearn क्यों चुनें?'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === 'en'
                ? "Comprehensive environmental education designed specifically for Indian schools"
                : "भारतीय स्कूलों के लिए विशेष रूप से डिज़ाइन की गई व्यापक पर्यावरण शिक्षा"
              }
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="eco-transition hover:nature-shadow hover:-translate-y-1">
                <CardHeader>
                  <div className="h-12 w-12 eco-gradient rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 eco-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {language === 'en' 
              ? 'Ready to Start Your Eco Journey?' 
              : 'अपनी पर्यावरण यात्रा शुरू करने के लिए तैयार हैं?'
            }
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            {language === 'en'
              ? "Join thousands of students across India learning to protect our environment"
              : "पूरे भारत के हजारों छात्रों के साथ हमारे पर्यावरण की रक्षा करना सीखें"
            }
          </p>
          <Button size="lg" variant="secondary" onClick={() => navigate('/dashboard')}>
            {language === 'en' ? 'Join EcoLearn Today' : 'आज ही EcoLearn से जुड़ें'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src={ecoLogo} alt="EcoLearn Logo" className="h-6 w-6" />
                <span className="font-bold">EcoLearn</span>
              </div>
              <p className="text-sm opacity-80">
                {language === 'en' 
                  ? "Empowering Indian students to become environmental champions"
                  : "भारतीय छात्रों को पर्यावरण चैंपियन बनने के लिए सशक्त बनाना"
                }
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">{language === 'en' ? 'Features' : 'सुविधाएं'}</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>{language === 'en' ? 'Interactive Quizzes' : 'संवादात्मक प्रश्नोत्तरी'}</li>
                <li>{language === 'en' ? 'Eco Challenges' : 'पर्यावरण चुनौतियां'}</li>
                <li>{language === 'en' ? 'School Rankings' : 'स्कूल रैंकिंग'}</li>
                <li>{language === 'en' ? 'Achievement Badges' : 'उपलब्धि बैज'}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">{language === 'en' ? 'Support' : 'सहायता'}</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>{language === 'en' ? 'Help Center' : 'सहायता केंद्र'}</li>
                <li>{language === 'en' ? 'Contact Us' : 'संपर्क करें'}</li>
                <li>{language === 'en' ? 'Teacher Resources' : 'शिक्षक संसाधन'}</li>
                <li>{language === 'en' ? 'School Partnership' : 'स्कूल साझेदारी'}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">{language === 'en' ? 'Follow Us' : 'हमारा पालन करें'}</h4>
              <div className="flex space-x-4">
                <div className="h-8 w-8 bg-primary/20 rounded flex items-center justify-center">
                  <TreePine className="h-4 w-4" />
                </div>
                <div className="h-8 w-8 bg-primary/20 rounded flex items-center justify-center">
                  <Droplets className="h-4 w-4" />
                </div>
                <div className="h-8 w-8 bg-primary/20 rounded flex items-center justify-center">
                  <Wind className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-sm opacity-80">
            © 2024 EcoLearn. {language === 'en' ? 'All rights reserved. Made with' : 'सभी अधिकार सुरक्षित। प्रेम से बनाया गया'} 💚 {language === 'en' ? 'for India' : 'भारत के लिए'}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
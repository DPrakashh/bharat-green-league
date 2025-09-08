import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Trophy, 
  Leaf, 
  Zap,
  ArrowRight,
  RefreshCw,
  BookOpen
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
  category: string;
}

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const questions: Question[] = [
    {
      id: 1,
      question: "What is the primary cause of air pollution in Delhi during winter?",
      options: [
        "Industrial emissions",
        "Vehicle exhaust",
        "Crop burning in nearby states",
        "Construction dust"
      ],
      correctAnswer: 2,
      explanation: "Crop burning in Punjab and Haryana during winter months is the major contributor to Delhi's air pollution, creating a thick smog layer.",
      points: 10,
      category: "Air Pollution"
    },
    {
      id: 2,
      question: "Which river is considered the most polluted in India?",
      options: [
        "Yamuna",
        "Ganga",
        "Narmada",
        "Kaveri"
      ],
      correctAnswer: 0,
      explanation: "The Yamuna river, especially the stretch through Delhi, is heavily polluted with industrial waste, sewage, and religious offerings.",
      points: 10,
      category: "Water Pollution"
    },
    {
      id: 3,
      question: "What percentage of India's electricity comes from renewable sources as of 2024?",
      options: [
        "15%",
        "25%",
        "35%",
        "45%"
      ],
      correctAnswer: 1,
      explanation: "India has achieved approximately 25% of its electricity generation from renewable sources, with ambitious targets to reach 50% by 2030.",
      points: 10,
      category: "Renewable Energy"
    },
    {
      id: 4,
      question: "Which Indian state has the highest forest cover percentage?",
      options: [
        "Madhya Pradesh",
        "Arunachal Pradesh",
        "Chhattisgarh",
        "Odisha"
      ],
      correctAnswer: 1,
      explanation: "Arunachal Pradesh has the highest forest cover percentage at about 79.63% of its geographical area, followed by Mizoram and Manipur.",
      points: 10,
      category: "Forest Conservation"
    },
    {
      id: 5,
      question: "What is the main greenhouse gas responsible for climate change?",
      options: [
        "Methane (CH4)",
        "Carbon dioxide (CO2)",
        "Nitrous oxide (N2O)",
        "Fluorinated gases"
      ],
      correctAnswer: 1,
      explanation: "Carbon dioxide (CO2) is the primary greenhouse gas, accounting for about 76% of total greenhouse gas emissions globally.",
      points: 10,
      category: "Climate Change"
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  useEffect(() => {
    if (timeLeft > 0 && !showFeedback && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showFeedback) {
      // Auto-submit when time runs out
      handleAnswerSubmit();
    }
  }, [timeLeft, showFeedback, quizCompleted]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showFeedback) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null && timeLeft > 0) return;
    
    setShowFeedback(true);
    
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + currentQuestion.points);
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setTimeLeft(30);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setTimeLeft(30);
    setQuizCompleted(false);
    setCorrectAnswers(0);
  };

  const getScoreMessage = () => {
    const percentage = (correctAnswers / questions.length) * 100;
    if (percentage >= 80) return { message: "Excellent! You're an Eco Expert! 🌟", badge: "Eco Expert", color: "text-success" };
    if (percentage >= 60) return { message: "Great job! Keep learning! 🌱", badge: "Environmental Scholar", color: "text-primary" };
    if (percentage >= 40) return { message: "Good start! Practice more! 💪", badge: "Eco Learner", color: "text-warning" };
    return { message: "Keep trying! Every step counts! 🌿", badge: "Eco Beginner", color: "text-muted-foreground" };
  };

  if (quizCompleted) {
    const result = getScoreMessage();
    return (
      <div className="min-h-screen bg-background p-4 md:p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="eco-gradient text-white">
            <CardContent className="p-8 text-center">
              <Trophy className="h-16 w-16 mx-auto mb-4 text-yellow-300" />
              <h1 className="text-3xl font-bold mb-2">Quiz Completed!</h1>
              <p className="text-xl opacity-90 mb-6">{result.message}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold">{score}</div>
                  <div className="text-sm opacity-80">Points Earned</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold">{correctAnswers}/{questions.length}</div>
                  <div className="text-sm opacity-80">Correct Answers</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold">{Math.round((correctAnswers/questions.length)*100)}%</div>
                  <div className="text-sm opacity-80">Accuracy</div>
                </div>
              </div>

              <Badge className="bg-white/20 text-white mb-6 text-lg px-4 py-2">
                🏆 {result.badge}
              </Badge>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="secondary" 
                  size="lg"
                  onClick={resetQuiz}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-5 w-5" />
                  Take Quiz Again
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/dashboard')}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  Back to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Achievement Animation */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full badge-unlock">
              <Leaf className="h-5 w-5" />
              <span className="font-medium">+{score} Eco Points Added!</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2"
            >
              ← Back to Dashboard
            </Button>
            <Badge className="eco-gradient text-white">
              <BookOpen className="h-4 w-4 mr-1" />
              Environmental Quiz
            </Badge>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Question {currentQuestionIndex + 1} of {questions.length}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Zap className="h-4 w-4" />
                Score: {score}
              </div>
              <div className={`flex items-center gap-2 ${timeLeft <= 10 ? 'text-red-500' : 'text-muted-foreground'}`}>
                <Clock className="h-4 w-4" />
                {timeLeft}s
              </div>
            </div>
          </div>
          
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <CardTitle className="text-xl mb-2">{currentQuestion.question}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Badge variant="outline">{currentQuestion.category}</Badge>
                  <span>•</span>
                  <span>{currentQuestion.points} points</span>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`w-full p-4 h-auto text-left justify-start eco-transition ${
                    selectedAnswer === index 
                      ? showFeedback
                        ? index === currentQuestion.correctAnswer
                          ? 'bg-success/10 border-success text-success'
                          : 'bg-destructive/10 border-destructive text-destructive'
                        : 'bg-primary/10 border-primary'
                      : showFeedback && index === currentQuestion.correctAnswer
                        ? 'bg-success/10 border-success text-success'
                        : ''
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showFeedback}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center">
                      {showFeedback && index === currentQuestion.correctAnswer && (
                        <CheckCircle className="h-4 w-4 text-success" />
                      )}
                      {showFeedback && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                        <XCircle className="h-4 w-4 text-destructive" />
                      )}
                      {!showFeedback && (
                        <span className="text-sm font-medium">{String.fromCharCode(65 + index)}</span>
                      )}
                    </div>
                    <span className="flex-1">{option}</span>
                  </div>
                </Button>
              ))}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <div className="flex items-start gap-3">
                  {selectedAnswer === currentQuestion.correctAnswer ? (
                    <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <p className={`font-medium mb-2 ${
                      selectedAnswer === currentQuestion.correctAnswer ? 'text-success' : 'text-destructive'
                    }`}>
                      {selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect!'}
                      {selectedAnswer === currentQuestion.correctAnswer && (
                        <span className="ml-2 text-sm">+{currentQuestion.points} points</span>
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
              
              {!showFeedback ? (
                <Button 
                  onClick={handleAnswerSubmit}
                  disabled={selectedAnswer === null}
                  className="eco-gradient"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button 
                  onClick={handleNextQuestion}
                  className="eco-gradient"
                >
                  {currentQuestionIndex < questions.length - 1 ? (
                    <>
                      Next Question
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      View Results
                      <Trophy className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;
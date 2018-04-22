
		  /* Author: Nicole Winters
          Author: Natasha Colletta
          Author: David Tays
          Author: Robert Sharp
          Date:  02/18/2018 - 4/22/2018
          Desc:  groupB JavaScript Trivia Using Knockout.js	 
          */
		  function TriviaViewModel() {
				// Absolutely had to make 'self' variable for 'this'.
				// Cannot reach the variables of model using 'this.something'
				// from inside the functions of the model unless calling self.blah
				var self = this;
				
				//function updates the qNum property and selectedQuestion
				self.next = function(){	
					var num = self.qNum() + 1;
					// this allows the quiz to go to question 1 if on question 10 when next is clicked
					if(num >= 10){
						num = 9;
					}
					// update model observables (could be another function)
					// check and submit answer ()
					self.update(num);
				};
				//function updates the qNum property and selectedQuestion
				self.back = function(){	
					var num = self.qNum() - 1;
					
					// this allows the quiz to go to question 10 if on question 1 when back is clicked
					if(num < 0){
						num = 0;
						alert("Beginning of Quiz, go the other way!");					
					}
					self.update(num);
                };
                // called when user goes forward or backward
				self.update = function(num){
					// update model observables
					if(!self.selectedAnswer() == ""){
						self.answers.splice(self.qNum(), 1, self.selectedAnswer());
					}					
					self.qNum(num);	
					self.selectedQuestion(self.questions()[self.qNum()]);
					self.selectedAnswer(self.answers()[self.qNum()]);
				}
				// triggered by done button
				self.submitTrivia = function(){
					var missed = [];
					var correct = 0;
					var incorrect = 0;
					// check if user left questions unanswered and push unanswered indexes to 'missed' array
					for(x = 0; x <= self.answers().length -1; x++){
						if(self.answers()[x] == ""){
							missed.push(x + 1);
						}
					}
					// if all questions are answered, compare
					if(missed.length == 0){
						//compare question.Answer with answers
						for(i = 0; i < 10; i++){
							if(self.questions()[i].answer == self.answers()[i]){
								correct++;
							}else{
								self.indexOfIncorrect.push(i);
								incorrect++;
							}							
                        }
                        // give rank and badge depending on the amount of answers correct
						var score = correct + "/10 CORRECT ANSWERS";
						if(correct < 6){
							self.rank("Beginner\n" + score);
							self.earnedBadge("images/BronzeStar.png");
						}else if(correct >= 6 && correct < 9){
							self.rank("Novice\n" + score);
							self.earnedBadge("images/SilverStar.png");
						}else{
							self.rank("Expert\n" + score);
							self.earnedBadge("images/GoldStar.png");
						}
						self.reveal(true);
						self.showTrivia(false);
					} else{
						alert("you missed questions:\n" + missed);
					}					
				}

				// This is changed when 'start quiz' is clicked to make the div visible
				self.showTrivia = ko.observable(false);

				self.reveal = ko.observable(false);
				// array of our questions **NEEDS COPY AND PASTE OF PROPERTIES FROM THE COMMENTED INFORMATION BELOW
				self.questions = ko.observableArray([
					{
					question: '1. The most common thing to do with objects are create them and to set, query, delete, and enumerate their properties?',
					options: ['True','False'],
					answer: 'True'
					},
					{
					question: '2. A property has a name and a ________?',
					options: ['string','value','number'],
					answer: 'value'
					},
					{
					question: '3. Event handlers allow JavaScript code to alter ________?',
					options: ['the behavior of windows','the behavior of documents','all of the above'],
					answer: 'all of the above'
					},
					{
					question: '4. Client-side JavaScript code is embedded within HTML documents in four ways?',
					options: ['True','False'],
					answer: 'True'
					},
					{
					question: '5. Any function that uses the yield keyword is a generator function?',
					options: ['True','False'],
					answer: 'True'
					},
					{
					question: '6. Which of the following is a correctly written function?',
					options: ['Function () []','Function {} ()','Function () {}'],
					answer: 'Function () {}'
					},
					{
					question: '7. A For loop executes a certain block of code provided that a certain expression remains true.',
					options: ['True','False'],
					answer: 'False' //: this describes a While loop
					},
					{
					question: '8. If x = 3, then x === "3" must be true right?',
					options: ['True','False'],
					answer: 'False'//: using "===" means the variables have equal values and types
					},
					{
					question: '9. Which Function with its parameters is written correctly?',
					options: ['Function (p1 p2 p3)','Function (p1, p2, p3)','Function (p1; p2; p3)'],
					answer: 'Function (p1, p2, p3)'
					},
					{
					question: '10. Setting breakpoints allows you to stop your code and examine it for errors before restarting it again.',
					options: ['True','False'],
					answer: 'True'
					}
				]);
				//INITIAL DECLARATIONS
				self.qNum = ko.observable(0);
				self.selectedQuestion = ko.observable(self.questions()[self.qNum()]);
				
				self.answers = ko.observableArray();
				// pre loads array so the user can answer question 2 before answering question 1 and the answer will be at the correct index of 'answers' array
				for(x = 0; x <= 9; x++){
					self.answers.push("");
				}
				self.selectedAnswer = ko.observable(self.answers()[self.qNum()]);
				self.indexOfIncorrect = ko.observableArray();
				self.rank = ko.observable("");
				self.earnedBadge = ko.observable("");				
			};
			// applyBindings has to be called to make the model accessible
			ko.applyBindings(new TriviaViewModel());
			
		  
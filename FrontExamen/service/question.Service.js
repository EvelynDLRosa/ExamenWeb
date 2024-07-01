async function fetchPreguntas() {
   try {
     const response = await fetch('http://localhost:3900/api/preguntas');
     if (response == null ) {
       throw new Error('Network response was not ok');
     }
     
     const preguntas = await response.json();
     // Usar las preguntas obtenidas desde la API
     selectedQuestions = preguntas.sort(() => 0.5 - Math.random()).slice(0, 10);
     showQuestion();
   } catch (error) {
     console.error('Error fetching preguntas:', error);
   }
 }


 fetchPreguntas();
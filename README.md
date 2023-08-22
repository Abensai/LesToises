# Les Toises – Software Developer Interview Questions
technical test for Symfony/React developer


## Question A:

What is refactoring?


Refactoring in web development refers to the process of restructuring and improving the existing codebase of a website or web application without changing its external behavior. It involves making changes to the code to enhance its readability, maintainability, and efficiency, while keeping the same functionality intact:

- Improving Code Quality: Refactoring helps in cleaning up code that might be messy, difficult to understand, or redundant. This makes the codebase more organized, easier to work with, and less prone to errors.
- Enhancing Maintainability: As web projects evolve, code can become harder to maintain. Refactoring breaks down complex code into smaller, more manageable parts, making it easier for developers to fix bugs, add new features, or make updates.
  -Increasing Efficiency: Through refactoring, you can identify and eliminate inefficiencies, such as redundant operations or slow algorithms. This can lead to improved performance and better user experiences.
  -Encouraging Collaboration: Clean and well-organized code is easier for multiple developers to work on simultaneously. Refactoring can make it easier for a team to collaborate on a project without stepping on each other's toes.


## Question B.1:

Your colleague has written the following files:
-	`refactoring/DATFileFilter.php`
-	`refactoring/PNGFileFilter.php`
-	`refactoring/XMLFileFilter.php`

Please review his code and provide feedback including suggestions for improvement.

Overall, the code appears to be functional, but there are some areas where it could be improved for better clarity, 
flexibility, and maintainability. Here are some suggestions for improvement:

- Constructor and Initialization: The constructor is currently empty, which is fine if you don't have any initialization 
to perform. However, if you plan to add initialization logic in the future, you can leave a comment explaining the purpose 
of the constructor to make the code more self-documenting.

- Use pathinfo() for Extension Retrieval: Instead of manually extracting the extension using string manipulation, you 
can use the pathinfo() function to get information about the file path. This would make your code more concise and less 
error-prone.

  `For example:`

      public static function getExtension($f)
      {
          $pathInfo = pathinfo($f);
          return isset($pathInfo['extension']) ? $pathInfo['extension'] : null;
      }

- Use Ternary Operator for Extension Comparison: You can use a ternary operator to simplify the extension comparison in 
the accept() method:

  `For example:`
      
      public function accept($f)
      {
        if (is_dir($f)) {
          return true;
        }

        $extension = $this->getExtension($f);
        return $extension === self::EXTENSION;
      }

- Separation of Concerns: While your class currently fulfills its filtering purpose, it might be more flexible to decouple 
the filtering logic from the description logic. This way, the class can focus solely on filtering files, and you can create 
a separate class or method to provide descriptions. This can make your code easier to maintain and extend in the future.

- Flexibility: Currently, the extension to be accepted is hardcoded as "dat" in the EXTENSION constant. If you anticipate 
needing to filter files with different extensions, you might consider making the extension configurable through a constructor 
parameter or a method.

- Comments and Documentation: Consider adding comments to your methods and important parts of your code to explain their 
purpose and functionality. This will help other developers (and your future self) understand the code more easily.

- Namespace: Depending on your application's architecture, consider placing your class in a namespace to avoid potential 
naming conflicts with other classes.

- Unit Testing: It's a good practice to create unit tests for your classes, especially if they have specific functionality 
like filtering. This ensures that your code behaves as expected and can catch potential issues early on.

- Exception Handling: Depending on how this class is used, you might want to add error handling for cases where the file 
path is invalid or not accessible.

- Use Constants: Consider using class constants for the extension and description values to make the code more maintainable 
and easily configurable:

  `code`
     
      const EXTENSION = "png";
      const DESCRIPTION = "PNG image file";

      const EXTENSION = "xml";
      const DESCRIPTION = "XML file";

  Then, you can use these constants in your methods instead of hardcoding the values.

- Method Duplication: The methods accept() and getExtension() are almost identical. 
If you find yourself using this pattern frequently, you could consider creating a base class with these methods and then 
creating subclasses like DATFileFilter and PNGFileFilter that inherit from the base class. This would promote code reuse
and maintenance.

## Question B.2:

Based on your answer to A refactor your colleague’s code.

## Question C:

You are asked to develop a very simple application using React/Typescript and Symfony/PHP.

A React interface displays 2 questions:

Question 1: I have little interest or pleasure in doing activities.
Question 2: I find it difficult to take an interest in my surroundings.

The answer to this questions is a value between 1 and 3. 1 means no problem and 3 a lot of trouble.

These values are then sent to an API which returns a score.

If the score is greater than or equal to 5, it returns a message containing
"Please make an appointment with your doctor".
If the score is less than 5, it returns a message containing "You have no worrying signs".

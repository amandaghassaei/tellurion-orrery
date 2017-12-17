import processing.pdf.*;

float OD = 7;//outer diameter, inches
float ID = 5.5;//outer diameter, inches

float dayOD = 5.7;
float tenDayOD = 5.9;
float dayNumbersOD = 6.4;
float numberTextDiameter = 6.1;
float monthTextDiameter = 6.7;
float allowance = 0;//lead in/lead out for engraving, inches

float numberFontSize = 20;
float monthFontSize = 23;

float[] daysPerMonth = {
  31.0,
  28.2422,
  31.0,
  30.0,
  31.0,
  30.0,
  31.0,
  31.0,
  30.0,
  31.0,
  30.0,
  31.0
};
 
 String[] monthNames = {
   "January",
   "February",
   "March",
   "April",
   "May",
   "June",
   "July",
   "August",
   "September",
   "October",
   "November",
   "December"
};

float dpi = 72;

void setup() {
  //8x8 inches at 72 dpi
  size(576, 576);
  noLoop();
  beginRecord(PDF, "calender.pdf"); 
  background(255);
  noFill();
}

void draw() {
  textAlign(CENTER);
  
  stroke(0);
  noFill();
  ellipse(width/2, height/2, dpi*OD, dpi*OD);
  ellipse(width/2, height/2, dpi*ID, dpi*ID);
  
  float daysSum = 0;
  for (int i=0;i<daysPerMonth.length;i++) daysSum+= daysPerMonth[i];
  
  stroke(255,0,0);//red
  
  pushMatrix();
  translate(width/2, height/2);
  float dayCount = 0;
  
  for (int i=0;i<daysPerMonth.length;i++){
    
    for (int j=0;j<daysPerMonth[i];j++){
      if (i==1 && j==28) continue;
      if (j==0) continue;
      float theta = -TWO_PI*(dayCount+j)/daysSum;
      float cosTheta = cos(theta);
      float sinTheta = sin(theta);
      float radius = dpi*dayOD/2;
      if (j%10 == 0) radius = dpi*tenDayOD/2;
      line(radius*cosTheta,radius*sinTheta,dpi*(ID-allowance)/2*cosTheta, dpi*(ID-allowance)/2*sinTheta);

    }
    
    float theta = -TWO_PI*dayCount/daysSum;
    float cosTheta = cos(theta);
    float sinTheta = sin(theta);
    line(dpi*(ID-allowance)/2*cosTheta,dpi*(ID-allowance)/2*sinTheta,dpi*(OD+allowance)/2*cosTheta, dpi*(OD+allowance)/2*sinTheta);
    dayCount += daysPerMonth[i];
  }
  
  ellipse(0, 0, dpi*dayOD, dpi*dayOD);
  ellipse(0, 0, dpi*tenDayOD, dpi*tenDayOD);
  ellipse(0, 0, dpi*dayNumbersOD, dpi*dayNumbersOD);
  
  //draw numbers
  PFont font = createFont("machtgth.ttf",numberFontSize);
  textFont(font);
  fill(0);
  
  dayCount = 0;
  for (int i=0;i<daysPerMonth.length;i++){
    float theta = -TWO_PI*dayCount/daysSum;
    drawCurvedText("1", numberTextDiameter*dpi/2, theta-0.01, 1);
    dayCount += daysPerMonth[i];
    theta = -TWO_PI*dayCount/daysSum;
    drawCurvedText(str(floor(daysPerMonth[i])), numberTextDiameter*dpi/2, theta+0.02, 0);
  }
  
  //draw month names
  font = createFont("machtgth.ttf",monthFontSize);
  textFont(font);
  
  dayCount = 0;
  for (int i=0;i<daysPerMonth.length;i++){
    float theta = -TWO_PI*(dayCount+daysPerMonth[i]/2)/daysSum;
    drawCurvedText(monthNames[i].toUpperCase(), monthTextDiameter*dpi/2, theta, 2);
    dayCount += daysPerMonth[i];
  }
  
  
  endRecord();
}

void drawCurvedText(String message, float radius, float startingTheta, int alignment){
  float arclength = startingTheta*radius;
  if (alignment==0){
    for (int i = message.length()-1; i >=0; i--)
    {
      //check the width of each character.
      char currentChar = message.charAt(i);
      float w = textWidth(currentChar);
  
      // Each box is centered so we move half the width
      arclength += w/2;
      float theta = arclength / radius;    
      pushMatrix();
      translate(radius*cos(theta), radius*sin(theta));
      rotate(theta-PI/2); // rotation is offset by 90 degrees
      
      text(currentChar,0,(textAscent()-textDescent())/2);
//      line(0,0,0,20);
      popMatrix();
      // Move halfway again
      arclength += w/2;
    }
  } else {
    if (alignment == 2) arclength += textWidth(message)*1.2/2;
    for (int i = 0; i < message.length(); i++)
    {
      //check the width of each character.
      char currentChar = message.charAt(i);
      float w = textWidth(currentChar);
      if (alignment == 2) w*=1.2;
  
      // Each box is centered so we move half the width
      arclength -= w/2;
      float theta = arclength / radius;    
      pushMatrix();
      translate(radius*cos(theta), radius*sin(theta));
      rotate(theta-PI/2); // rotation is offset by 90 degrees
      
      text(currentChar,0,(textAscent()-textDescent())/2);
//      line(0,0,0,20);
      popMatrix();
      // Move halfway again
      arclength -= w/2;
    }
  }
}

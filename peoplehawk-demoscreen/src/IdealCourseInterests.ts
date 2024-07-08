export interface CourseInterest{
  name: string
  description: string
  features: string
  likes: string
  courses: string
  color1: string
  color2: string
  img_src: any
}

export const CourseInterestData: CourseInterest[] = [
  {
    "name": "ARTISTIC",
    "description": "Artistic types (Creators): tend to think outside the box and to come up with innovative ideas.",
    "features": "Expressive, Imaginative, Free-spirited",
    "likes": "see things from Different Perspectives",
    "courses": "Fine Arts, Graphic Design, Music, Media, Interior Design, Architecture, Communications",
    "color1": "#2e6747",
    "color2": "#58856c",
    "img_src":require('../src/assests/img/artistic.png')
  },
  {
    "name": "CONVENTIONAL",
    "description": "Conventional types (Organisers): are very organised, accurate and methodical. They typically like to get things done properly and on time.",
    "features": "Practical, Orderly, Efficient",
    "likes": "adhere to Structure, Rules and Regulations",
    "courses": "Accounting, Finance, Business, Actuarial, Human Resources, Marketing, Law",
    "color1": "#d54d35",
    "color2": "#dd715d",
    "img_src":require('../src/assests/img/conventional.png')
  },
  {
    "name": "ENTERPRISING",
    "description": "Enterprising types (Persuaders): are very persuasive by nature and have a natural ability to lead others. They typically have excellent social skills and are good at influencing others.",
    "features": "Influential, Ambitious, Risk-taking",
    "likes": "Sell Things",
    "courses": "Hospitality, Tourism, Communications, Sport, Public Relations, Marketing, Real Estate",
    "color1": "#d76a6a",
    "color2": "#df8888",
     "img_src":require('../src/assests/img/enterprising.png')
  },
  {
    "name": "INVESTIGATIVE",
    "description": "Investigative types (Thinkers): are problem solvers who tend to be analytical, working with ideas and concepts. They like to do things that involve theory, research and intellectual inquiry.",
    "features": "Analytical, Theoretical, Inquisitive",
    "likes": "work with Data and Logic",
    "courses": "Biology, Chemistry, Physics, Mathematics, Computer Science, Psychology, Economics",
    "color1": "#4b84ae",
    "color2": "#6f9dbe",
     "img_src":require('../src/assests/img/investigate.png')
  },
  {
    "name": "REALISTIC",
    "description": "Realistic types (Doers): tend to be assertive, competitive and are interested in activities that require motor coordination, skill and strength",
    "features": "Active, Hands-on, Adventurous",
    "likes": "work with Things",
    "courses": "Engineering, Construction, Environmental, Agriculture, Geology, Marine Biology, Physical Education",
    "color1": "#76accd",
    "color2": "#91bdd7",
     "img_src":require('../src/assests/img/realistic.png')
  },
  {
    "name": "SOCIAL",
    "description": "Social types (Helpers): are people-oriented and tend to form close relationships with others. They are typically welcoming and sociable.",
    "features": "Caring, Supportive, Collaborative",
    "likes": "Serve and Help Others",
    "courses": "Social Work, Nursing, Education, Sociology, Occupational Therapy, Religion, Public Administration",
    "color1": "#f29b10",
    "color2": "#f6b040",
     "img_src":require('../src/assests/img/social.png')
  }
]
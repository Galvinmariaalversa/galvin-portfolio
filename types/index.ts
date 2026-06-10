export interface Project {
  title: string;
  category: string;
  categoryName: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  link: string;
}

export interface Skill {
  name: string;
  percentage: number;
}

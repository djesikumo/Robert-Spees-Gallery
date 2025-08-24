export interface Education {
  id: string;
  education: string;
}

export interface Exhibition {
  id: string;
  year: number;
  exhibition: string;
}

export interface Press {
  id: string;
  author: string;
  title: string;
  publication: string;
  date: string;
}

export interface CV {
  education: Education[];
  exhibitions: Exhibition[];
  press: Press[];
}
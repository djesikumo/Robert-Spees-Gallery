interface Education {
  id: string;
  education: string;
}

interface Exhibition {
  id: string;
  year: number;
  exhibition: string;
}

interface Press {
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
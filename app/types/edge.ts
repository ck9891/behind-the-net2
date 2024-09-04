export interface PlayerStats {
  Season: number;
  Player: number;
  First: string;
  Last: string;
  Pos: string;
  Shoots: string;
  Team: string;
  Jersey: number;
  GP: number;
  G: number;
  A: number;
  "Skating Speed": number;
  "Avg Skating Speed": number;
  "%ile Skating Speed": number;
  "22+ Bursts": number;
  "Avg 22+ Bursts": number;
  "%ile 22+ Bursts": number;
  "20-22 Bursts": number;
  "Avg 20-22 Bursts": number;
  "%ile 20-22 Bursts": number;
  "18-20 Bursts": number;
  "Avg 18-20 Bursts": number;
  "%ile 18-20 Bursts": number;
  "O-Zone": string;
  "Avg O-Zone": string;
  "N-Zone": string;
  "Avg N-Zone": string;
  "D-Zone": string;
  "Avg D-Zone": string;
  "Shot Speed": number;
  "Avg Shot Speed": number;
  "%ile Shot Speed": number;
  "100+ Speed": number;
  "Avg 100+ Speed": number;
  "%ile 100+ Speed": number;
  "90-100 Speed": number;
  "Avg 90-100 Speed": number;
  "%ile 90-100 Speed": number;
  "80-90 Speed": number;
  "Avg 80-90 Speed": number;
  "%ile 80-90 Speed": number;
  "70-80 Speed": number;
  "Avg 70-80 Speed": number;
  "%ile 70-80 Speed": number;
}

export type Player = {
  playerId: string
  season:   string
  first:    string
  last:     string
  position: string
  shoots:   string
  team:     string
  jersey:   number
  gp:       number
  goals:    number
  assists:  number
}
const megazines: megazine[] = [
  {
    img: "/covers/backstagetalks_cover_issue_5.png",
    color: "#00c1b5",
    id: 5,
    soldOut: false,
  },
  {
    img: "/covers/backstagetalks_cover_issue_4.png",
    color: "#ff651a",
    id: 4,
    soldOut: false,
  },
  {
    img: "/covers/backstagetalks_cover_issue_3.png",
    color: "#ffbe00",
    id: 3,
    soldOut: false,
  },
  {
    img: "/covers/backstagetalks_cover_issue_2.png",
    color: "#1d3fbb",
    id: 2,
    soldOut: false,
  },
  {
    img: "/covers/backstagetalks_cover_issue_1.png",
    color: "#e30512",
    id: 1,
    soldOut: true,
  },
];

export type megazine = {
  img: string;
  color: string;
  id: number;
  soldOut: boolean;
  ref?: React.RefObject<HTMLDivElement>;
};

export default megazines;

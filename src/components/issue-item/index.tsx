import { FC, useEffect, useState } from "react";

import { megazine } from "../../data";
import isScrolledIntoView from "../../utils/isScrolledIntoView";

const IssueItem: FC<{
  data: megazine;
  index: number;
  onIssueInView: (index: number) => void;
  isMobile: boolean;
}> = ({ data, index, onIssueInView, isMobile }) => {
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    setHeight(window.innerHeight);
  }, [window.innerHeight]);

  useEffect(() => {
    const handleSetIssueInvView = () => {
      if (data.ref && data.ref.current) {
        const elem = data.ref.current;
        if (isScrolledIntoView(elem)) onIssueInView(index);
      }
    };

    if (isMobile) {
      handleSetIssueInvView();

      window.addEventListener("scroll", () => {
        handleSetIssueInvView();
      });
    }

    return () => {
      window.removeEventListener("scroll", () => {
        handleSetIssueInvView();
      });
    };
  }, [index, data, isMobile]);

  return (
    <div
      ref={data.ref}
      id={`issue${data.id}`}
      className="item-container"
      style={{ height: `${height}px` }}
    >
      <div className="issue-item">
        <img
          className="cover"
          src={process.env.PUBLIC_URL + data.img}
          alt={`Backstage cover ${data.id}`}
        />
        <p className="title">
          Issue #{data.id} {data.soldOut && "is sold out."}
        </p>
        {!data.soldOut ? (
          <>
            <p>
              <a
                className="buy-btn reverse"
                href="https://www.bruil.info/product/backstage-talks-5/"
              >
                Buy here
              </a>
            </p>
            <p>
              or in{" "}
              <a
                className="reverse"
                href="http://backstagetalks.com/stocklist.php"
              >
                selected stores
              </a>
              .
            </p>
          </>
        ) : (
          <>
            <p>
              If you are lucky, you may get the last pieces in{" "}
              <a
                className="reverse"
                href="http://backstagetalks.com/stocklist.php"
              >
                selected stores
              </a>
              .
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default IssueItem;

import React, { FC, useEffect, useState } from "react";

import { megazine } from "../../data";

const IssueItem: FC<{
  data: megazine;
}> = ({ data }) => {
  const [height, setHeight] = useState<number>();
  useEffect(() => {
    setHeight(window.innerHeight);
  }, [window.innerHeight]);

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

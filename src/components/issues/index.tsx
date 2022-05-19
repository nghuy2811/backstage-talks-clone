import React, { createRef, useState, useEffect, useRef } from "react";

import isScrolledIntoView from "../../utils/isScrolledIntoView";
import IssueItem from "../issue-item";
import megazines from "../../data";
import "../../assets/styles/issue.css";
import "../../assets/styles/issue-responsive.css";

const Issues = () => {
  const megazinesWithRef = megazines.map((megazine) => {
    return {
      ...megazine,
      ref: createRef<HTMLDivElement>(),
    };
  });
  const [issueInView, setIssuesInView] = useState<{
    id: number;
    color: string;
  }>();
  const issueContainerRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [index, setIndex] = useState(0);
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    document.body.style.backgroundColor = `${
      issueInView ? issueInView.color : undefined
    }`;
  }, [issueInView]);

  useEffect(() => {
    setHeight(window.innerHeight);
  }, [window.innerHeight]);

  useEffect(() => {
    window.addEventListener("load", () => {
      megazinesWithRef.forEach((item) => {
        if (item.ref.current) {
          if (isScrolledIntoView(item.ref.current)) {
            setIssuesInView({ id: item.id, color: item.color });
          }
        }
      });
    });
  }, []);

  useEffect(() => {
    const megazineInView = megazinesWithRef[index];
    if (megazineInView) {
      setIssuesInView({ id: megazineInView.id, color: megazineInView.color });
    }
  }, [index]);

  useEffect(() => {
    // https://stackoverflow.com/questions/70843953/react-wait-until-transition-end-for-vertical-scroll
    window.addEventListener("wheel", (event: WheelEvent) => {
      if (!isAnimating) {
        setIsAnimating(true);
        if (event.deltaY < 0) {
          // Up
          index > 0 && setIndex(index - 1);
        } else {
          // Down
          index < 4 && setIndex(index + 1);
        }
      }
    });
  }, [isAnimating]);

  useEffect(() => {
    if (issueContainerRef && issueContainerRef.current && height) {
      issueContainerRef.current.style.transform = `translate3d(0,-${
        index * height
      }px,0)`;
    }
  }, [index, height]);

  return (
    <>
      <section className="issues">
        <div className="header">
          <img
            src={require("../../assets/images/logo.png")}
            alt="Logo"
            className="header-logo"
          />
        </div>
        <div className="description">
          <p>
            Backstage Talks is a magazine of casual, but in depth dialogues on
            design and business. Our decisions shape and influence this complex
            world—to have a chance to make the right ones, we need to talk.
            <span className="copyright">
              <br />© 2022{" "}
              <a href="http://milk.sk/">Published by studio Milk</a>
            </span>
          </p>
          <br />
          <br />
          <a
            className="policy"
            href="https://backstagetalks.com/privacy-policy.php"
          >
            Privacy Policy
          </a>
        </div>
        <a className="mail reverse" href="mailto:info@backstagetalks.com">
          info@backstagetalks.com
        </a>
        <ul className="menu">
          {megazinesWithRef.map((item) => (
            <li key={item.id}>
              <a
                className={`reverse ${
                  item.id === issueInView?.id ? "active" : ""
                }`}
                href={`#issue${item.id}`}
              >
                Issue #{item.id}
              </a>
            </li>
          ))}
        </ul>
        <div
          ref={issueContainerRef}
          onTransitionEnd={() => setIsAnimating(false)}
          className="issues-container"
        >
          {megazinesWithRef.map((megazine, index) => (
            <IssueItem key={index} data={megazine} />
          ))}
        </div>
      </section>

      <footer>
        <div className="description">
          <p>
            Backstage Talks is a magazine of casual, but in depth dialogues on
            design and business. Our decisions shape and influence this complex
            world—to have a chance to make the right ones, we need to talk.
            <span className="copyright">
              <br />© 2022{" "}
              <a href="http://milk.sk/">Published by studio Milk</a>
            </span>
          </p>
          <br />
          <br />
          <a
            className="policy"
            href="https://backstagetalks.com/privacy-policy.php"
          >
            Privacy Policy
          </a>
        </div>
        <a className="mail reverse" href="mailto:info@backstagetalks.com">
          info@backstagetalks.com
        </a>
      </footer>
    </>
  );
};

export default Issues;

import Linkify from "react-linkify";

export default function MyLinkify(props) {
  return (
    <Linkify
      componentDecorator={(decoratedHref, decoratedText, key) => (
        <a
          target="_blank"
          style={{ color: "#3182ce" }}
          href={decoratedHref}
          key={key}
          onClick={(event) => event.stopPropagation()}
        >
          {decoratedText}
        </a>
      )}
      {...props}
    ></Linkify>
  );
}

import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

// eslint-disable-next-line
export const ArtistPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  name,
  voice,
  helmet,
  image,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {name} - {voice}
            </h1>
            <p>{description}</p>
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map((tag) => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

ArtistPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  name: PropTypes.string,
  voice: PropTypes.string,
  helmet: PropTypes.object,
};

const ArtistPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <ArtistPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.name}
        helmet={
          <Helmet titleTemplate="%s | Artist">
            <title>{`${post.frontmatter.name} - ${post.frontmatter.voice}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.name} - ${post.frontmatter.voice}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        name={post.frontmatter.name}
        voice={post.frontmatter.voice}
      />
    </Layout>
  );
};

ArtistPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default ArtistPost;

export const pageQuery = graphql`
  query ArtistPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        name
        voice
        tags
      }
    }
  }
`;

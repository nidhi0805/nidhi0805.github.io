import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { usePrefersReducedMotion } from '@hooks';
import { FaBriefcase } from 'react-icons/fa';

const StyledJobsSection = styled.section`
  max-width: 900px;
  margin: 0 auto;
  padding: 50px 0;
  position: relative;

  h2 {
    font-size: var(--fz-heading);
    font-weight: 600;
    color: var(--lightest-slate);
    text-align: center;
    margin-bottom: 20px;
  }

  .timeline {
    position: relative;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      width: 3px;
      height: 100%;
      background: var(--green);
      transform: translateX(-50%);
    }
  }
`;

const TimelineItem = styled.div`
  position: relative;
  width: 50%;
  padding: 20px;
  box-sizing: border-box;
  text-align: ${({ isRight }) => (isRight ? 'left' : 'right')};
  display: flex;
  flex-direction: column;
  align-items: ${({ isRight }) => (isRight ? 'flex-start' : 'flex-end')};
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  &::before {
    content: '';
    position: absolute;
    top: 30px;
    ${({ isRight }) => (isRight ? 'left: -15px' : 'right: -15px')};
    width: 10px;
    height: 10px;
    background: var(--green);
    border-radius: 50%;
  }

  h3 {
    font-size: var(--fz-xl);
    color: var(--green);
    margin-bottom: 5px;
  }

  .range {
    font-size: var(--fz-xs);
    color: var(--light-slate);
    font-family: var(--font-mono);
    margin-bottom: 10px;
  }

  p {
    font-size: var(--fz-sm);
    color: var(--lightest-slate);
  }

  .icon {
    position: absolute;
    top: 20px;
    ${({ isRight }) => (isRight ? 'left: -40px' : 'right: -40px')};
    font-size: 24px;
    color: var(--green);
  }

  @media (max-width: 768px) {
    width: 80%;
    text-align: left;
    align-items: flex-start;

    .icon {
      left: -30px;
    }
  }
`;

const Jobs = () => {
  const data = useStaticQuery(graphql`
    query {
      jobs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/jobs/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              company
              range
              url
            }
            html
          }
        }
      }
    }
  `);

  const jobsData = data.jobs.edges;
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!prefersReducedMotion) {
      sr.reveal(revealContainer.current, srConfig());
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const items = document.querySelectorAll('.timeline-item');
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
          item.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <StyledJobsSection id="jobs" ref={revealContainer}>
      <h2 className="numbered-heading">I've Worked With</h2>

      <div className="timeline">
        {jobsData.map(({ node }, i) => {
          const { frontmatter, html } = node;
          const { title, company, url, range } = frontmatter;
          const isRight = i % 2 === 0;

          return (
            <TimelineItem key={i} className="timeline-item" isRight={isRight}>
              <FaBriefcase className="icon" />
              <h3>
                {title} @{' '}
                <a href={url} className="inline-link">
                  {company}
                </a>
              </h3>
              <p className="range">{range}</p>
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </TimelineItem>
          );
        })}
      </div>
    </StyledJobsSection>
  );
};

export default Jobs;

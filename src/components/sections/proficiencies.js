import React from 'react';
import styled from 'styled-components';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const StyledProficienciesSection = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px 20px;

  h2 {
    font-size: var(--fz-heading);
    font-weight: 600;
    color: var(--lightest-slate); /* Theme-matching */
    text-align: center;
    margin-bottom: 20px;
    position: relative;
    white-space: nowrap;
  }

  .proficiencies-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    justify-items: center;
  }

  .proficiency-card {
    background: #112240; /* Dark Navy */
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    position: relative;
    height: 280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    }
  }

  .chart-container {
    width: 100%;
    height: 150px;
    display: none;
    justify-content: center;
    align-items: center;
  }

  .proficiency-card:hover .chart-container {
    display: flex;
  }
`;

// Custom Tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: '#0a192f', // Dark navy to match theme
        color: '#ffffff',
        padding: '8px 12px',
        borderRadius: '5px',
        fontSize: '14px',
        fontWeight: '600',
        textAlign: 'center',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
      }}>
        {payload[0].name}
      </div>
    );
  }
  return null;
};

// --- Theme-Matched Skill Data ---
const skills = [
  {
    title: 'Data Analysis',
    description: 'Uncover trends and insights from raw data.',
    chartData: [
      { name: 'Python', value: 90, color: '#2DCC70' }, // Teal
      { name: 'SQL', value: 85, color: '#33CFFF' }, // Light Blue
      { name: 'Excel', value: 75, color: '#FFC300' } // Yellow
    ]
  },
  {
    title: 'Predictive Analytics',
    description: 'Use predictive models to forecast outcomes.',
    chartData: [
      { name: 'Logistic Regression', value: 85, color: '#8854C0' }, // Purple
      { name: 'Random Forest', value: 80, color: '#FF3364' }, // Pink
      { name: 'XGBoost', value: 75, color: '#FFC300' } // Yellow
    ]
  },
  {
    title: 'Data Visualization',
    description: 'Create compelling dashboards and reports.',
    chartData: [
      { name: 'Tableau', value: 85, color: '#33CFFF' }, // Light Blue
      { name: 'Power BI', value: 80, color: '#FF3364' }, // Pink
      { name: 'Matplotlib', value: 70, color: '#8854C0' } // Purple
    ]
  },
  {
    title: 'Technical Writing',
    description: 'Translate complex data into simple reports.',
    chartData: [
      { name: 'Documentation', value: 85, color: '#FFC300' }, // Yellow
      { name: 'Report Writing', value: 80, color: '#33CFFF' }, // Light Blue
      { name: 'Whitepapers', value: 70, color: '#2DCC70' } // Teal
    ]
  },
  {
    title: 'Web Development',
    description: 'Build interactive and dynamic web solutions.',
    chartData: [
      { name: 'React', value: 85, color: '#FF3364' }, // Pink
      { name: 'JavaScript', value: 80, color: '#FFC300' }, // Yellow
      { name: 'HTML/CSS', value: 75, color: '#2DCC70' } // Teal
    ]
  },
  {
    title: 'Collaboration',
    description: 'Work seamlessly with teams to optimize data strategies.',
    chartData: [
      { name: 'Teamwork', value: 90, color: '#33CFFF' }, // Light Blue
      { name: 'Communication', value: 85, color: '#8854C0' }, // Purple
      { name: 'Project Management', value: 75, color: '#FF3364' } // Pink
    ]
  }
];

const Proficiencies = () => {
  return (
    <StyledProficienciesSection>
      <h2 className="numbered-heading">My Proficiencies</h2>
      <div className="proficiencies-grid">
        {skills.map((skill, index) => (
          <div key={index} className="proficiency-card">
            <h3>{skill.title}</h3>
            <p>{skill.description}</p>

            {/* Pie Chart Appears on Hover */}
            <div className="chart-container">
              <PieChart width={120} height={120}>
                <Pie
                  data={skill.chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  dataKey="value"
                >
                  {skill.chartData.map((entry, i) => (
                    <Cell key={`cell-${i}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </div>
          </div>
        ))}
      </div>
    </StyledProficienciesSection>
  );
};

export default Proficiencies;

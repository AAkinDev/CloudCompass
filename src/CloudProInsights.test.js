import { render, screen } from '@testing-library/react';
import CloudProInsights from './CloudProInsights';

test('renders CloudProInsights header', () => {
  render(<CloudProInsights />);
  const headerElements = screen.getAllByText(/CloudProInsights/i);
  expect(headerElements.length).toBeGreaterThan(0);
});

test('renders navigation buttons', () => {
  render(<CloudProInsights />);
  const compareButton = screen.getByRole('button', { name: /Compare/i });
  const decideButton = screen.getByRole('button', { name: /Decide/i });
  const analyticsButton = screen.getByRole('button', { name: /Analytics/i });
  const calculateButton = screen.getByRole('button', { name: /Calculate/i });
  
  expect(compareButton).toBeInTheDocument();
  expect(decideButton).toBeInTheDocument();
  expect(analyticsButton).toBeInTheDocument();
  expect(calculateButton).toBeInTheDocument();
});

test('renders main heading', () => {
  render(<CloudProInsights />);
  const mainHeading = screen.getByRole('heading', { name: /Navigate Your Cloud Journey with Confidence/i });
  expect(mainHeading).toBeInTheDocument();
});

test('renders description text', () => {
  render(<CloudProInsights />);
  const description = screen.getByText(/Compare cloud services, analyze costs, and make informed decisions across AWS, Azure, GCP, Oracle, and IBM Cloud/i);
  expect(description).toBeInTheDocument();
});

test('renders action buttons', () => {
  render(<CloudProInsights />);
  const startComparingButton = screen.getByRole('button', { name: /Start Comparing Services/i });
  const getRecommendationsButton = screen.getByRole('button', { name: /Get Recommendations/i });
  
  expect(startComparingButton).toBeInTheDocument();
  expect(getRecommendationsButton).toBeInTheDocument();
});

test('renders footer content', () => {
  render(<CloudProInsights />);
  const footerText = screen.getByText(/© 2025 CloudProInsights by AAkinDev/i);
  const githubLink = screen.getByRole('link', { name: /GitHub/i });
  
  expect(footerText).toBeInTheDocument();
  expect(githubLink).toBeInTheDocument();
}); 
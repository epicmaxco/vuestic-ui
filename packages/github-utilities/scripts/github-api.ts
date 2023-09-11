// Function to get labels from a GitHub repo
import { Label, PartialLabel } from './github-types'
import fetch from 'node-fetch'

export const getLabels = async (repo: string, token: string): Promise<Label[]> => {
  const url = `https://api.github.com/repos/${repo}/labels`
  const headers = { 'Authorization': `token ${token}` }

  const response = await fetch(url, { headers })

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`)
  }

  return await response.json()
}

export const createLabel = async (repo: string, label: PartialLabel, token: string) => {
  const url = `https://api.github.com/repos/${repo}/labels`;
  const headers = {
    'Authorization': `token ${token}`,
    'Content-Type': 'application/json'
  };

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(label)
  });

  if (!response.ok) {
    // Log the response body for debugging
    const responseBody = await response.text();
    console.error(`Error creating label. Response: ${response.status} - ${response.statusText}. Body: ${responseBody}`);
  }

  return await response.json();
};

export const updateLabel = async (repo: string, label: PartialLabel, token: string) => {
  const url = `https://api.github.com/repos/${repo}/labels/${encodeURIComponent(label.name)}`;
  const headers = {
    'Authorization': `token ${token}`,
    'Content-Type': 'application/json'
  };

  const response = await fetch(url, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(label)
  });

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  return await response.json();
};

export const deleteLabel = async (repo: string, labelName: string, token: string) => {
  const url = `https://api.github.com/repos/${repo}/labels/${encodeURIComponent(labelName)}`;
  const headers = {
    'Authorization': `token ${token}`
  };

  const response = await fetch(url, {
    method: 'DELETE',
    headers
  });

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }
};

export const testTokenPermission = async (token: string, repo: string) => {
  const testLabel = {
    name: "test-label",
    color: "ffffff",
    description: "Temporary label for testing token permissions"
  };

  // Try creating a label
  const createResponse = await fetch(`https://api.github.com/repos/${repo}/labels`, {
    method: 'POST',
    headers: {
      'Authorization': `token ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(testLabel)
  });

  if (!createResponse.ok) {
    console.log("Invalid token or insufficient permissions for creating labels.");
    return;
  }

  // If label creation is successful, delete the test label
  const deleteResponse = await fetch(`https://api.github.com/repos/${repo}/labels/${testLabel.name}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `token ${token}`
    }
  });

  if (deleteResponse.ok) {
    console.log("Token is valid and has sufficient permissions for label operations.");
  } else {
    console.log("Token is valid but lacks permissions for deleting labels.");
  }

  return !!deleteResponse.ok
};

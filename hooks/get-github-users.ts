import { GitHubSearchResponse } from "../types/user-types";

export const getGitHubUsers = async (username: string): Promise<GitHubSearchResponse> => {
    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${username}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
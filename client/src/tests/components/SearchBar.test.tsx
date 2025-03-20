// src/tests/components/SearchBar.test.tsx
import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "../../components/molecules/SearchBar";

describe("SearchBar", () => {
  const mockProps = {
    searchTerm: "Jane",
    setSearchTerm: jest.fn(),
    onSearch: jest.fn(),
    onVoiceSearch: jest.fn(),
    onKeyPress: jest.fn(),
  };

  it("renders without crashing", () => {
    const { getByPlaceholderText, getByText } = render(<SearchBar {...mockProps} />);
    expect(getByPlaceholderText("Search by Stylist, Service, Date, or Time")).toBeInTheDocument();
    expect(getByText("Search")).toBeInTheDocument();
  });

  it("displays the search term in the input", () => {
    const { getByPlaceholderText } = render(<SearchBar {...mockProps} />);
    const input = getByPlaceholderText("Search by Stylist, Service, Date, or Time");
    expect(input).toHaveValue("Jane");
  });

  it("calls setSearchTerm when the input changes", async () => {
    const user = userEvent.setup();
    const { getByPlaceholderText } = render(<SearchBar {...mockProps} />);
    const input = getByPlaceholderText("Search by Stylist, Service, Date, or Time");
    await user.type(input, "John");
    expect(mockProps.setSearchTerm).toHaveBeenCalledWith("John");
  });

  it("calls onVoiceSearch when the voice icon is clicked", async () => {
    const user = userEvent.setup();
    const { getByTestId } = render(<SearchBar {...mockProps} />);
    const voiceIcon = getByTestId("voice-icon");
    await user.click(voiceIcon);
    expect(mockProps.onVoiceSearch).toHaveBeenCalled();
  });

  it("calls onSearch when the search button is clicked", async () => {
    const user = userEvent.setup();
    const { getByText } = render(<SearchBar {...mockProps} />);
    const searchButton = getByText("Search");
    await user.click(searchButton);
    expect(mockProps.onSearch).toHaveBeenCalled();
  });
});
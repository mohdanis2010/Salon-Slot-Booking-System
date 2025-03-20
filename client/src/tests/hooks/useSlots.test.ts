// src/tests/hooks/useSlots.test.ts
import { renderHook, act } from "@testing-library/react-hooks";
import { useSlots } from "../../hooks/useSlots";

// Mock axios if used in useSlots
import axios from "axios";
jest.mock("axios");

describe("useSlots Hook", () => {
  it("fetches slots on mount", async () => {
    const mockSlots = [
      { id: 1, stylist: "Jane", time: "10:00 AM", date: "2025-03-20", service: "Haircut" },
    ];
    axios.get.mockResolvedValue({ data: mockSlots });

    const { result, waitForNextUpdate } = renderHook(() => useSlots());

    await waitForNextUpdate();

    expect(result.current.slots).toEqual(mockSlots);
  });

  it("searches slots when searchSlots is called", async () => {
    const mockSlots = [
      { id: 1, stylist: "Jane", time: "10:00 AM", date: "2025-03-20", service: "Haircut" },
    ];
    axios.get.mockResolvedValue({ data: mockSlots });

    const { result, waitForNextUpdate } = renderHook(() => useSlots());

    await act(async () => {
      await result.current.searchSlots("Jane");
    });

    await waitForNextUpdate();

    expect(result.current.slots).toEqual(mockSlots);
    expect(axios.get).toHaveBeenCalledWith("/api/slots?search=Jane");
  });
});
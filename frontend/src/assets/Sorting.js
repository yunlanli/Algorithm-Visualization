const ROUTINES = 
[
    "Insertion Sort", 
    "Quick Sort", 
    "Merge Sort", 
    "Heap Sort", 
    "Shell Sort", 
    "Radix Sort"
];


const INFO = {
    "Insertion Sort": {
        text: "",
        link: "https://www.geeksforgeeks.org/insertion-sort/"
    },

    "Quick Sort": {
        text: 
            `   Quick Sort is often the go-to algorithm for general-purpose sorting.

            In the worst case, it decays to selection sort, but on average, it gives O(NlogN) running time complexity.

            The quick sort routine can be summarized in 3 steps:

                1. Pivot Selection: Choose an element as the pivot for other elements to compare against
                2. Partition: Partition the array into one with elements >= pivot, and the other with elements <= pivot
                3. Recursion: Recursively sort the two partitions

            In the animation, median of 3 is used as the pivot selection strategy. It selects the median of the first, middle and last element of the unsorted array as the pivot. As real world data are somewhat sorted, this gives some protection against choosing the smallest or largest element of the unsorted array as the pivot.
            
            When the unsorted array has fewer than 4 elements, insertion sort is used as it's faster when array size is small.`,

        link: "https://www.geeksforgeeks.org/quick-sort/"
    },

    "Merge Sort": {
        text: "",
        link: "https://www.geeksforgeeks.org/merge-sort/"
    },

    "Heap Sort": {
        text: "",
        link: "https://www.geeksforgeeks.org/heap-sort/"
    },

    "Shell Sort": {
        text: "",
        link: "https://www.geeksforgeeks.org/shellsort/"
    },

    "Radix Sort": {
        text: "",
        link: "https://www.geeksforgeeks.org/radix-sort/"
    }
}

export { ROUTINES, INFO };
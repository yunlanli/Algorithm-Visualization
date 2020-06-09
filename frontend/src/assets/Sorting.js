const ROUTINES = 
[
    "Insertion Sort", 
    "Bubble Sort",
    "Quick Sort", 
    "Merge Sort", 
    "Heap Sort", 
    "Shell Sort"
];


const INFO = {
    "Insertion Sort": {
        text: 
        `Insertion Sort is an O(N^2) general-purpose sorting algorithm. In the best case where a sorted array is given, it sorts the array in linear time.
        
        Implemented with 2 simple for-loops, Inserstion Sort has a very small constant factor in its time complexity. Therefore, it's faster when the input array is small, despite having a higher-ordered big-Oh compared to other algorithms such as quick sort, heap sort and merge sort. 
        
        Insertion Sort iterates over each element from left to right. For each element, it finds the appropriate position in the sorted array (the subarray formed by all elements before the current element) and then put it in. 
        `,
        link: "https://www.geeksforgeeks.org/insertion-sort/"
    },

    "Bubble Sort": {
        text: `Bubble Sort sorts the biggest element in the unsorted array each time, contrary to insertion sort. However, both algorithms have a worst case O(N^2) and best case O(N) time complexity.
        
        There are 2 key steps in Bubble Sort:
        1. Finding the biggest element in the unsorted array in linear time:
        Iterate over each element(exclusing the last one) in the unsorted array, and swap the current element with its right neighbor if it's bigger. After K comparisons, it's guaranteed that the element indexed at K+1 is the biggest seen so far.
        2. Stop when no swap occurs in one iteration:
        Each element is no bigger than its right neighbor, suggesting that the unsorted array is actually sorted. When we are given an sorted array, we are done after one pass through the array.`,
        link: "https://www.geeksforgeeks.org/bubble-sort/"
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
        text: `Merge Sort adopts the Divide-and-Conquer strategy. It guarantees a worst case O(NlogN) time complexity.
        
        There are 2 key steps in Merge Sort:
            1. Divide the unsorted array by half, and recursively merge sort each half. For the base case of a single-item array, we directly return it.
            2. Merging 2 sorted halves using 2 pointers in linear time.
            
        As shown in the animation, when we merge two sorted arrays, each comparison would sort an item. In other words, each comparison will advance one pointer forward by 1, thus ensuring an O(N) merge routine.`,
        link: "https://www.geeksforgeeks.org/merge-sort/"
    },

    "Heap Sort": {
        text: "",
        link: "https://www.geeksforgeeks.org/heap-sort/"
    },

    "Shell Sort": {
        text: `Shell Sort, named after its inventor Donald Sell, was one of the first sorting algorithms to break the quadratic time bound.

        It works by comparing elements that are distant; the distance between comparisons decreases as the algorithm runs until the last phase, in which adjacent elements are compared.
        
        Hibbard's increment is used in the animation, i.e the sequence 2^k - 1, ... , 3, 1. The time analyis is rather involved and it has been shown that the worst case running time is O(N^1.5).  `,
        link: "https://www.geeksforgeeks.org/shellsort/"
    } 
}

export { ROUTINES, INFO };
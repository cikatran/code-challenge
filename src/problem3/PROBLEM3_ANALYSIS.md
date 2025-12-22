# Problem 3: Messy React - Analysis and Solution

## Issues Found in Original Code

### 1. **Critical Runtime Error - Undefined Variable**
**Location**: Filter function in `useMemo`
**Issue**: `if (lhsPriority > -99)` references undefined `lhsPriority` variable
**Fix**: Use `balancePriority` instead

### 2. **Logic Error - Incorrect Filtering**
**Issue**: Filter condition `balance.amount <= 0` with `return true` shows zero/negative balances
**Fix**: Should filter out balances with amount <= 0

### 3. **Performance Issue - Unnecessary Dependencies**
**Issue**: `prices` included in `useMemo` dependencies but never used in sorting logic
**Fix**: Remove `prices` from dependency array to prevent unnecessary re-computation

### 4. **React Anti-Pattern - Index as Key**
**Issue**: Using `index` as key in list rendering
**Fix**: Use unique identifier like `${currency}-${blockchain}`

### 5. **Type Safety Issue - Missing Property**
**Issue**: `WalletBalance` interface missing `blockchain` property
**Fix**: Add `blockchain` property to interface

### 6. **Performance Issue - Unused Computation**
**Issue**: `formattedBalances` computed but never used
**Fix**: Remove unused variable or use it in rendering

### 7. **Runtime Error - Undefined Property**
**Issue**: `rows` mapping uses `sortedBalances` but references `formattedAmount` which doesn't exist
**Fix**: Use `formattedBalances` in the rows mapping

### 8. **Logic Issue - Incomplete Sorting**
**Issue**: Sort function doesn't handle equal priority cases
**Fix**: Return 0 when priorities are equal

### 9. **Performance Issue - Repeated Calculations**
**Issue**: `getPriority` called multiple times for same balance
**Fix**: Use priority map and optimize sorting

### 10. **Type Safety Issue - Using `any` Type**
**Issue**: `getPriority` parameter uses `any` type
**Fix**: Use proper string type or enum for blockchain values

## Key Improvements in Refactored Code

1. **Type Safety**: Added proper TypeScript types and interfaces
2. **Performance**:
   - Used priority map instead of switch statement
   - Optimized `useMemo` dependencies
   - Added `useMemo` for expensive operations
3. **React Best Practices**:
   - Proper key props for list rendering
   - Memoization of expensive operations
4. **Code Quality**:
   - Extracted constants outside component
   - Improved naming and structure
   - Added comprehensive error handling

## Performance Optimizations

1. **Priority Lookup**: O(1) map lookup instead of O(n) switch statement
2. **Memoization**: Prevents unnecessary re-renders and re-computations
3. **Efficient Sorting**: Simplified sort comparison function
4. **Reduced Dependencies**: Removed unused dependencies from `useMemo`

## Type Safety Improvements

1. **Strict Typing**: Eliminated `any` types
2. **Complete Interfaces**: Added missing properties
3. **Type Guards**: Proper type checking and validation
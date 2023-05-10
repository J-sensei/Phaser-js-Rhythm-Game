const ByeOrNotHardMap = [
    new NoteData(0, 0, 1, 0, 1, 1, 8, 0),
    new NoteData(2, 0, 1, 0, 1, 1, 6, 1),
    new NoteData(3, 2, 1, 0, 1, 1, 2, 0),
    new NoteData(4, 0, 1, 0, 1, 1, 4, 1),
    new NoteData(5, 0, 1, 0, 1, 1, 4, 0),
    new NoteData(6, 0, 1, 0, 1, 1, 8, 1),
    new NoteData(8, 0, 1, 0, 0, 0, 0, 0),
    // Test note type
    new NoteData(8, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(8, 2, 1, 0, 0, 0, 0, 0),
    new NoteData(8, 2, 4, 3, 0, 0, 0, 0),
    new NoteData(8, 3, 1, 0, 0, 0, 0, 0),
    new NoteData(8, 3, 4, 2, 0, 0, 0, 0),

    new NoteData(9, 0, 1, 0, 0, 0, 0, 0),
    new NoteData(9, 1, 1, 0, 0, 0, 0, 1),
    new NoteData(9, 2, 1, 0, 0, 0, 0, 1),
    new NoteData(9, 2, 4, 3, 0, 0, 0, 1),
    new NoteData(9, 3, 2, 0, 0, 0, 0, 1),

    new NoteData(9, 3, 2, 1, 0, 0, 0, 0),
    new NoteData(10, 0, 1, 0, 0, 0, 0, 0),
    new NoteData(10, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(10, 2, 1, 0, 0, 0, 0, 0),
    new NoteData(10, 2, 4, 3, 0, 0, 0, 0),
    new NoteData(10, 3, 1, 0, 0, 0, 0, 0),

    new NoteData(10, 3, 2, 1, 0, 0, 0, 1),
    new NoteData(11, 0, 1, 0, 0, 0, 0, 1),
    new NoteData(11, 1, 1, 0, 0, 0, 0, 1),
    new NoteData(11, 2, 1, 0, 0, 0, 0, 1),
    new NoteData(11, 2, 4, 3, 0, 0, 0, 1),
    new NoteData(11, 3, 1, 0, 0, 0, 0, 1),

    new NoteData(11, 3, 2, 1, 0, 0, 0, 0),
    new NoteData(12, 0, 1, 0, 0, 0, 0, 0),
    new NoteData(12, 0, 4, 3, 0, 0, 0, 0),
    new NoteData(12, 1, 1, 0, 0, 0, 0, 0),

    new NoteData(12, 1, 2, 1, 0, 0, 0, 1),
    new NoteData(12, 2, 1, 0, 0, 0, 0, 1),
    new NoteData(12, 2, 4, 3, 0, 0, 0, 1),
    new NoteData(12, 3, 1, 0, 0, 0, 0, 1),

    new NoteData(12, 3, 2, 1, 0, 0, 0, 0),
    new NoteData(13, 0, 2, 0, 0, 0, 0, 0),
    new NoteData(13, 0, 2, 1, 0, 0, 0, 0),
    new NoteData(13, 1, 2, 0, 0, 0, 0, 0),
    new NoteData(13, 1, 2, 1, 0, 0, 0, 0),

    new NoteData(13, 2, 2, 0, 0, 0, 0, 1),
    new NoteData(13, 2, 2, 1, 0, 0, 0, 1),
    new NoteData(13, 3, 2, 0, 0, 0, 0, 1),
    new NoteData(13, 3, 2, 1, 0, 0, 0, 1),

    new NoteData(14, 0, 2, 0, 0, 0, 0, 0),
    new NoteData(14, 0, 2, 1, 0, 0, 0, 0),
    new NoteData(14, 1, 2, 0, 0, 0, 0, 0),
    new NoteData(14, 1, 2, 1, 0, 0, 0, 0),

    new NoteData(14, 2, 2, 0, 0, 0, 0, 1),
    new NoteData(14, 2, 2, 1, 0, 0, 0, 1),
    new NoteData(14, 3, 2, 0, 0, 0, 0, 1),
    new NoteData(14, 3, 2, 1, 0, 0, 0, 1),

    new NoteData(15, 0, 1, 0, 0, 0, 0, 0), // Build up *Good
    new NoteData(15, 1, 1, 0, 0, 0, 0, 0), //*Bye
    new NoteData(15, 2, 2, 0, 0, 0, 0, 1), // Ma
    new NoteData(15, 2, 2, 1, 0, 0, 0, 0), // Ta
    new NoteData(15, 3, 1, 0, 0, 0, 0, 1), // Ne
    // Bass spam
    new NoteData(16, 0, 4, 0, 1, 1, 3, 0),
    new NoteData(16, 3, 1, 0, 3, 0, 0, 1),

    new NoteData(17, 0, 1, 0, 1, 1, 1, 1), // Hype
    // Different rhytnm
    new NoteData(17, 2, 4, 0, 3, 0, 0, 0),
    new NoteData(17, 2, 4, 3, 3, 0, 0, 0),
    new NoteData(17, 3, 4, 2, 3, 0, 0, 0),

    new NoteData(18, 0, 2, 0, 0, 0, 0, 1),
    new NoteData(18, 0, 2, 1, 0, 0, 0, 0),
    new NoteData(18, 1, 2, 0, 0, 0, 0, 1),
    new NoteData(18, 1, 2, 1, 0, 0, 0, 0),
    new NoteData(18, 2, 4, 0, 0, 0, 0, 1),
    new NoteData(18, 2, 4, 3, 0, 0, 0, 0),
    new NoteData(18, 3, 1, 0, 0, 0, 0, 0),
    new NoteData(18, 3, 2, 1, 0, 0, 0, 0),

    new NoteData(19, 0, 1, 0, 1, 2, 1, 0),
    new NoteData(19, 1, 1, 0, 1, 2, 1, 1),
    new NoteData(19, 2, 1, 0, 1, 2, 1, 0),

    new NoteData(19, 2, 4, 3, 0, 0, 0, 1),
    new NoteData(19, 3, 2, 0, 0, 0, 0, 1), 
    new NoteData(19, 3, 2, 1, 0, 0, 0, 1), 
    new NoteData(20, 0, 4, 0, 0, 0, 0, 1),
    // Triple
    new NoteData(20, 0, 4, 2, 0, 0, 0, 0), 
    new NoteData(20, 0, 4, 3, 0, 0, 0, 0), 
    new NoteData(20, 1, 2, 0, 0, 0, 0, 0), 

    new NoteData(20, 1, 2, 1, 0, 0, 0, 0), 

    new NoteData(20, 2, 2, 0, 1, 1, 1, 1), 
    new NoteData(20, 3, 2, 1, 0, 0, 0, 0), 

    new NoteData(21, 0, 1, 0, 1, 2, 1, 1),
    new NoteData(21, 1, 1, 0, 1, 2, 1, 0),
    new NoteData(21, 2, 1, 0, 1, 2, 1, 1),

    new NoteData(21, 2, 4, 3, 0, 0, 0, 0),
    new NoteData(21, 3, 2, 0, 0, 0, 0, 0), 
    new NoteData(21, 3, 2, 1, 0, 0, 0, 0), 

    new NoteData(22, 0, 2, 0, 0, 0, 0, 1),
    new NoteData(22, 0, 2, 1, 0, 0, 0, 1),

    new NoteData(22, 1, 2, 0, 0, 0, 0, 0),
    new NoteData(22, 1, 2, 1, 0, 0, 0, 0),

    new NoteData(22, 2, 2, 0, 0, 0, 0, 1),
    new NoteData(22, 2, 2, 1, 0, 0, 0, 1),
    new NoteData(22, 3, 2, 0, 0, 0, 0, 0),
    new NoteData(22, 3, 2, 1, 0, 0, 0, 0),

    new NoteData(23, 0, 1, 0, 1, 2, 1, 0),
    new NoteData(23, 1, 1, 0, 1, 2, 1, 1),
    new NoteData(23, 2, 1, 0, 1, 2, 1, 0),

    new NoteData(23, 2, 4, 3, 0, 0, 0, 1),
    new NoteData(23, 3, 2, 0, 0, 0, 0, 1), 
    new NoteData(23, 3, 2, 1, 0, 0, 0, 1), 

    new NoteData(24, 0, 1, 0, 0, 0, 0, 1), // Good
    new NoteData(24, 1, 1, 0, 0, 0, 0, 1), // Bye

    new NoteData(24, 2, 2, 0, 0, 0, 0, 0), // Ma
    new NoteData(24, 2, 2, 1, 0, 0, 0, 0), // Ta
    new NoteData(24, 3, 1, 0, 0, 0, 0, 0), // Ne

    new NoteData(25, 0, 1, 0, 1, 1, 1, 1), // Hold for stop beat
    new NoteData(25, 1, 1, 0, 3, 0, 0, 0),
    // Need to recheck
    // new NoteData(25, 0, 2, 1, 0, 0, 0, 0),
    // new NoteData(25, 1, 1, 1, 0, 0, 0, 0),
    new NoteData(25, 2, 4, 0, 0, 0, 0, 0),
    new NoteData(25, 2, 4, 3, 0, 0, 0, 0),
    new NoteData(25, 3, 2, 0, 0, 0, 0, 0),
    new NoteData(25, 3, 2, 1, 0, 0, 0, 0),

    new NoteData(26, 0, 2, 0, 0, 0, 0, 1),
    new NoteData(26, 0, 2, 1, 0, 0, 0, 1),
    new NoteData(26, 1, 2, 0, 0, 0, 0, 1),
    new NoteData(26, 1, 2, 1, 0, 0, 0, 1),

    new NoteData(26, 2, 4, 0, 0, 0, 0, 0),
    new NoteData(26, 2, 4, 3, 0, 0, 0, 0),
    new NoteData(26, 3, 2, 0, 0, 0, 0, 0),
    new NoteData(26, 3, 2, 1, 0, 0, 0, 0),

    new NoteData(27, 0, 1, 0, 1, 2, 1, 0),
    new NoteData(27, 1, 1, 0, 1, 2, 1, 1),
    new NoteData(27, 2, 1, 0, 1, 2, 1, 0),

    new NoteData(27, 2, 4, 3, 0, 0, 0, 1),
    new NoteData(27, 3, 2, 0, 0, 0, 0, 1),
    new NoteData(27, 3, 2, 1, 0, 0, 0, 1),
    new NoteData(28, 0, 4, 0, 0, 0, 0, 1),

    // Triple
    new NoteData(28, 0, 4, 2, 0, 0, 0, 0), 
    new NoteData(28, 0, 4, 3, 0, 0, 0, 0), 
    new NoteData(28, 1, 2, 0, 0, 0, 0, 0), 

    new NoteData(28, 2, 4, 0, 0, 0, 0, 1), 
    new NoteData(28, 2, 4, 3, 0, 0, 0, 1), 
    new NoteData(28, 3, 2, 0, 0, 0, 0, 1),
    new NoteData(28, 3, 2, 1, 0, 0, 0, 1), 

    new NoteData(29, 0, 1, 0, 1, 2, 1, 0), 
    new NoteData(29, 1, 1, 0, 1, 2, 1, 1), 
    new NoteData(29, 2, 1, 0, 1, 2, 1, 0), 

    new NoteData(29, 2, 4, 3, 0, 0, 0, 1), 
    new NoteData(29, 3, 2, 0, 0, 0, 0, 1), 
    new NoteData(29, 3, 2, 1, 0, 0, 0, 1), 
    new NoteData(30, 0, 2, 0, 0, 0, 0, 0), 
    new NoteData(30, 0, 2, 1, 0, 0, 0, 1),
    new NoteData(30, 1, 4, 0, 0, 0, 0, 0),

    // Triple
    new NoteData(30, 1, 4, 2, 0, 0, 0, 1),
    new NoteData(30, 1, 4, 3, 0, 0, 0, 1),
    new NoteData(30, 2, 1, 0, 0, 0, 0, 1),

    // new NoteData(30, 3, 2, 0, 1, 2, 1, 0),
    // new NoteData(30, 3, 2, 1, 1, 2, 1, 1),
    // new NoteData(31, 0, 1, 0, 1, 1, 1, 0), // Hold
     new NoteData(30, 3, 2, 0, 0, 0, 0, 0),
    new NoteData(30, 3, 2, 1, 0, 0, 0, 1),
    new NoteData(31, 0, 1, 0, 1, 1, 1, 0), // Hold           

    // Double distinguish beat
    new NoteData(31, 1, 4, 3, 3, 0, 0, 1),
    new NoteData(31, 2, 2, 1, 3, 0, 0, 1),

    new NoteData(32, 0, 1, 0, 1, 1, 1, 1),
    new NoteData(32, 1, 1, 0, 1, 1, 1, 0),
    new NoteData(32, 2, 1, 0, 1, 1, 1, 1),
    new NoteData(32, 3, 1, 0, 1, 1, 1, 0),
    new NoteData(33, 0, 1, 0, 0, 0, 0, 1),
    new NoteData(33, 1, 1, 0, 0, 0, 0, 1),
    new NoteData(33, 2, 2, 0, 0, 0, 0, 0),
    new NoteData(33, 3, 2, 0, 0, 0, 0, 0),
    new NoteData(33, 3, 2, 1, 1, 1, 1, 1),

    new NoteData(34, 1, 1, 0, 1, 1, 1, 0),

    new NoteData(34, 2, 2, 1, 1, 1, 1, 1),
    new NoteData(34, 3, 2, 1, 1, 1, 1, 0),

    new NoteData(35, 1, 2, 0, 1, 1, 1, 1),
    //new NoteData(35, 1, 2, 0, 0, 0, 0, 0),

    new NoteData(35, 2, 2, 1, 0, 0, 0, 0),
    //new NoteData(35, 3, 2, 0, 0, 0, 0, 0),
    new NoteData(35, 3, 2, 1, 0, 0, 0, 0),

    new NoteData(36, 0, 1, 0, 1, 1, 1, 1),
    new NoteData(36, 1, 1, 0, 1, 1, 1, 0),
    new NoteData(36, 2, 1, 0, 1, 1, 1, 1),
    new NoteData(36, 3, 1, 0, 1, 1, 1, 0),
    new NoteData(37, 0, 1, 0, 1, 1, 1, 1),
    new NoteData(37, 1, 1, 0, 1, 1, 1, 0),

    new NoteData(37, 2, 2, 1, 0, 0, 0, 1),
    new NoteData(37, 3, 2, 0, 0, 0, 0, 1),
    new NoteData(37, 3, 2, 1, 1, 1, 1, 0),
    new NoteData(38, 1, 1, 0, 1, 1, 1, 1),
    new NoteData(38, 2, 2, 1, 0, 0, 0, 1),

    new NoteData(38, 3, 2, 1, 3, 0, 0, 0),
    new NoteData(39, 0, 4, 1, 3, 0, 0, 0),

    new NoteData(39, 1, 2, 1, 0, 0, 0, 0),
    new NoteData(39, 2, 2, 0, 0, 0, 0, 0),
    new NoteData(39, 2, 2, 1, 0, 0, 0, 0),
    new NoteData(39, 3, 2, 0, 0, 0, 0, 0),
    new NoteData(39, 3, 2, 1, 1, 1, 1, 1),

    new NoteData(40, 1, 2, 0, 1, 1, 1, 0),
    //new NoteData(40, 1, 2, 0, 0, 0, 0, 1),

    new NoteData(40, 2, 2, 0, 1, 1, 1, 1),
    new NoteData(40, 3, 2, 0, 1, 1, 1, 0),

    // Second Verse
    new NoteData(41, 0, 1, 0, 1, 1, 4, 1), 
    new NoteData(41, 1, 1, 0, 2, 0, 0, 1), // No hit
    new NoteData(41, 2, 1, 0, 2, 0, 0, 1), // No hit
    new NoteData(41, 3, 1, 0, 2, 0, 0, 1), // No hit
    new NoteData(42, 0, 1, 0, 1, 1, 4, 0), 
    new NoteData(42, 1, 1, 0, 2, 0, 0, 0), // No hit
    new NoteData(42, 2, 1, 0, 2, 0, 0, 0), // No hit
    new NoteData(42, 3, 1, 0, 2, 0, 0, 0), // No hit

    new NoteData(43, 0, 1, 0, 0, 0, 0, 1),
    new NoteData(43, 1, 1, 0, 0, 0, 0, 1),
    new NoteData(43, 2, 1, 0, 0, 0, 0, 1),
    new NoteData(43, 3, 1, 0, 0, 0, 0, 1),

    new NoteData(44, 0, 1, 0, 0, 0, 0, 0),
    new NoteData(44, 1, 1, 0, 0, 0, 0, 0),

    new NoteData(44, 2, 2, 0, 0, 0, 0, 1), // Da
    new NoteData(44, 2, 2, 1, 0, 0, 0, 1), // Ke
    new NoteData(44, 3, 1, 0, 0, 0, 0, 1), // No

    new NoteData(45, 0, 1, 0, 1, 1, 4, 0), 
    new NoteData(45, 1, 1, 0, 2, 0, 0, 0), // No hit
    new NoteData(45, 2, 1, 0, 2, 0, 0, 0), // No hit
    new NoteData(45, 3, 1, 0, 2, 0, 0, 0), // No hit
    new NoteData(46, 0, 1, 0, 1, 1, 4, 1), 
    new NoteData(46, 1, 1, 0, 2, 0, 0, 1), // No hit
    new NoteData(46, 2, 1, 0, 2, 0, 0, 1), // No hit
    new NoteData(46, 3, 1, 0, 2, 0, 0, 1), // No hit

    new NoteData(47, 0, 1, 0, 0, 0, 0, 0),
    new NoteData(47, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(47, 2, 1, 0, 0, 0, 0, 0),
    new NoteData(47, 3, 1, 0, 0, 0, 0, 0),

    new NoteData(48, 0, 1, 0, 0, 0, 0, 1),
    new NoteData(48, 1, 1, 0, 0, 0, 0, 1),
    new NoteData(48, 2, 1, 0, 0, 0, 0, 0),
    new NoteData(48, 3, 1, 0, 0, 0, 0, 0),

    new NoteData(49, 1, 1, 0, 0, 0, 0, 1),
    new NoteData(49, 2, 1, 0, 0, 0, 0, 1),
    new NoteData(49, 2, 4, 3, 0, 0, 0, 1),
    new NoteData(49, 3, 2, 0, 0, 0, 0, 1),
    new NoteData(49, 3, 2, 1, 0, 0, 0, 1),

    new NoteData(50, 0, 1, 0, 0, 0, 0, 0),
    new NoteData(50, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(50, 2, 1, 0, 0, 0, 0, 0),
    new NoteData(50, 2, 4, 3, 0, 0, 0, 0),
    new NoteData(50, 3, 2, 0, 0, 0, 0, 0),
    new NoteData(50, 3, 2, 1, 0, 0, 0, 1),

    new NoteData(51, 0, 1, 0, 0, 0, 0, 1),
    new NoteData(51, 1, 1, 0, 0, 0, 0, 1),
    new NoteData(51, 2, 1, 0, 0, 0, 0, 1),
    new NoteData(51, 2, 4, 3, 0, 0, 0, 1),
    new NoteData(51, 3, 2, 0, 0, 0, 0, 1),
    new NoteData(51, 3, 2, 1, 0, 0, 0, 0),

    new NoteData(52, 0, 1, 0, 0, 0, 0, 0),
    new NoteData(52, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(52, 2, 1, 0, 0, 0, 0, 0),
    new NoteData(52, 2, 4, 3, 0, 0, 0, 0),
    new NoteData(52, 3, 2, 0, 0, 0, 0, 0),
    new NoteData(52, 3, 2, 1, 0, 0, 0, 1),

    new NoteData(53, 0, 2, 0, 0, 0, 0, 0),
    new NoteData(53, 0, 2, 1, 0, 0, 0, 0),
    new NoteData(53, 1, 2, 0, 0, 0, 0, 0),
    new NoteData(53, 1, 2, 1, 0, 0, 0, 0),

    new NoteData(53, 2, 2, 0, 0, 0, 0, 1),
    new NoteData(53, 2, 2, 1, 0, 0, 0, 1),
    new NoteData(53, 3, 2, 0, 0, 0, 0, 1),
    new NoteData(53, 3, 2, 1, 0, 0, 0, 1),

    new NoteData(54, 0, 2, 0, 0, 0, 0, 0),
    new NoteData(54, 0, 2, 1, 0, 0, 0, 0),
    new NoteData(54, 1, 2, 0, 0, 0, 0, 0),
    new NoteData(54, 1, 2, 1, 0, 0, 0, 0),

    new NoteData(54, 2, 2, 0, 0, 0, 0, 1),
    new NoteData(54, 2, 2, 1, 0, 0, 0, 1),
    new NoteData(54, 3, 2, 0, 0, 0, 0, 1),
    new NoteData(54, 3, 2, 1, 0, 0, 0, 1),

    // new NoteData(55, 0, 2, 0, 0, 0, 0, 0),
    // new NoteData(55, 0, 2, 1, 0, 0, 0, 1),
    // new NoteData(55, 1, 2, 0, 0, 0, 0, 0),
    // new NoteData(55, 1, 2, 1, 0, 0, 0, 1),
    new NoteData(55, 0, 4, 0, 0, 0, 0, 0),
    new NoteData(55, 0, 4, 1, 0, 0, 0, 0),
    new NoteData(55, 0, 4, 2, 0, 0, 0, 0),
    new NoteData(55, 0, 4, 3, 0, 0, 0, 0),
    new NoteData(55, 1, 4, 0, 0, 0, 0, 0),
    new NoteData(55, 1, 4, 1, 0, 0, 0, 0),
    new NoteData(55, 1, 4, 2, 0, 0, 0, 0),
    new NoteData(55, 1, 4, 3, 0, 0, 0, 0),

    // new NoteData(55, 2, 2, 0, 0, 0, 0, 0),
    // new NoteData(55, 2, 2, 1, 0, 0, 0, 1),
    // new NoteData(55, 3, 2, 0, 0, 0, 0, 0),
    // new NoteData(55, 3, 2, 1, 0, 0, 0, 1),

    new NoteData(55, 2, 4, 0, 0, 0, 0, 1),
    new NoteData(55, 2, 4, 1, 0, 0, 0, 1),
    new NoteData(55, 2, 4, 2, 0, 0, 0, 1),
    new NoteData(55, 2, 4, 3, 0, 0, 0, 1),
    new NoteData(55, 3, 4, 0, 0, 0, 0, 1),
    new NoteData(55, 3, 4, 1, 0, 0, 0, 1),
    new NoteData(55, 3, 4, 2, 0, 0, 0, 1),
    new NoteData(55, 3, 4, 3, 0, 0, 0, 1),

    new NoteData(56, 0, 2, 0, 3, 0, 0, 1), // Second verse start * Good
    new NoteData(56, 1, 1, 0, 1, 2, 3, 0),// Bye
    new NoteData(56, 3, 1, 0, 0, 0, 0, 1),

    new NoteData(57, 0, 2, 0, 3, 0, 0, 0), // Big impact
    new NoteData(57, 0, 2, 1, 0, 0, 0, 1),
    new NoteData(57, 1, 2, 0, 0, 0, 0, 1),
    new NoteData(57, 1, 2, 1, 0, 0, 0, 0),
    new NoteData(57, 2, 2, 0, 0, 0, 0, 0),

    // Triple
    new NoteData(57, 2, 4, 2, 0, 0, 0, 1),
    new NoteData(57, 2, 4, 3, 0, 0, 0, 1),
    new NoteData(57, 3, 4, 0, 0, 0, 0, 1),

    new NoteData(57, 3, 2, 1, 0, 0, 0, 0),
    new NoteData(58, 0, 2, 0, 0, 0, 0, 0),
    new NoteData(58, 0, 2, 1, 0, 0, 0, 0),
    new NoteData(58, 1, 2, 0, 0, 0, 0, 1),
    new NoteData(58, 1, 2, 1, 0, 0, 0, 1),
    new NoteData(58, 2, 2, 0, 0, 0, 0, 1),

    // Triple
    new NoteData(58, 2, 4, 2, 0, 0, 0, 0),
    new NoteData(58, 2, 4, 3, 0, 0, 0, 0),
    new NoteData(58, 3, 2, 0, 0, 0, 0, 0),

    // EDM
    new NoteData(59, 0, 1, 0, 1, 1, 1, 0),
    new NoteData(59, 1, 1, 0, 1, 1, 1, 1),
    new NoteData(59, 2, 1, 0, 1, 1, 1, 0),
    new NoteData(59, 3, 2, 1, 0, 0, 0, 1),
    new NoteData(60, 0, 2, 0, 0, 0, 0, 1),

    // Triple
    new NoteData(60, 0, 4, 2, 0, 0, 0, 0),
    new NoteData(60, 0, 4, 3, 0, 0, 0, 0),
    new NoteData(60, 1, 2, 0, 0, 0, 0, 0),

    new NoteData(60, 1, 2, 1, 0, 0, 0, 1),
    new NoteData(60, 2, 2, 0, 0, 0, 0, 0),

    // Triple
    new NoteData(60, 2, 4, 2, 0, 0, 0, 1),
    new NoteData(60, 2, 4, 3, 0, 0, 0, 1),
    new NoteData(60, 3, 2, 0, 0, 0, 0, 1),

    new NoteData(60, 3, 2, 1, 0, 0, 0, 0),
    new NoteData(61, 0, 2, 0, 0, 0, 0, 0),
    new NoteData(61, 0, 2, 1, 0, 0, 0, 0),
    new NoteData(61, 1, 2, 0, 0, 0, 0, 1),
    new NoteData(61, 1, 2, 1, 0, 0, 0, 1),
    new NoteData(61, 2, 2, 0, 0, 0, 0, 1),

    // Triple
    new NoteData(61, 2, 4, 2, 0, 0, 0, 0),
    new NoteData(61, 2, 4, 3, 0, 0, 0, 0),
    new NoteData(61, 3, 2, 0, 0, 0, 0, 0),

    new NoteData(61, 3, 2, 1, 0, 0, 0, 1),
    new NoteData(62, 0, 2, 0, 0, 0, 0, 0),
    new NoteData(62, 0, 2, 1, 0, 0, 0, 1),
    new NoteData(62, 1, 2, 0, 0, 0, 0, 0),

    // Triple
    new NoteData(62, 1, 4, 2, 0, 0, 0, 1),
    new NoteData(62, 1, 4, 3, 0, 0, 0, 1),
    new NoteData(62, 2, 2, 0, 0, 0, 0, 1),

    new NoteData(62, 2, 2, 1, 0, 0, 0, 0),
    new NoteData(62, 3, 2, 0, 0, 0, 0, 1),
    new NoteData(62, 3, 2, 1, 0, 0, 0, 0),

    // EDM
    new NoteData(63, 0, 1, 0, 1, 1, 1, 1),
    new NoteData(63, 1, 1, 0, 1, 1, 1, 0),
    new NoteData(63, 2, 1, 0, 1, 1, 1, 1),

    // Triple
    new NoteData(63, 3, 4, 2, 0, 0, 0, 0),
    new NoteData(63, 3, 4, 3, 0, 0, 0, 0),
    new NoteData(64, 0, 2, 0, 0, 0, 0, 0),

    new NoteData(64, 0, 2, 1, 0, 0, 0, 1),
    new NoteData(64, 1, 2, 0, 0, 0, 0, 1),
    new NoteData(64, 1, 2, 1, 0, 0, 0, 1),
    new NoteData(64, 2, 2, 0, 0, 0, 0, 0),
    new NoteData(64, 2, 2, 1, 0, 0, 0, 0),
    new NoteData(64, 3, 2, 0, 0, 0, 0, 0),
    new NoteData(64, 3, 2, 1, 0, 0, 0, 1),

    // Special
    new NoteData(65, 0, 1, 0, 1, 1, 1, 1),
    new NoteData(65, 1, 1, 0, 3, 0, 0, 0),

    new NoteData(65, 1, 2, 1, 0, 0, 0, 0),
    new NoteData(65, 2, 2, 0, 0, 0, 0, 0),

    // Triple
    new NoteData(65, 2, 4, 2, 0, 0, 0, 1),
    new NoteData(65, 2, 4, 3, 0, 0, 0, 1),
    new NoteData(65, 3, 2, 0, 0, 0, 0, 1),

    new NoteData(65, 3, 2, 1, 0, 0, 0, 0),
    new NoteData(66, 0, 2, 0, 0, 0, 0, 1),
    new NoteData(66, 0, 2, 1, 0, 0, 0, 0),
    new NoteData(66, 1, 2, 0, 0, 0, 0, 1),
    new NoteData(66, 1, 2, 1, 0, 0, 0, 0),
    new NoteData(66, 2, 2, 0, 0, 0, 0, 1),

    new NoteData(66, 2, 2, 1, 1, 1, 1, 0),
    new NoteData(66, 3, 2, 1, 0, 0, 0, 1),

    new NoteData(67, 0, 2, 0, 0, 0, 0, 0),

    new NoteData(67, 0, 2, 1, 0, 0, 0, 1),
    new NoteData(67, 1, 2, 0, 0, 0, 0, 1),
    new NoteData(67, 1, 2, 1, 0, 0, 0, 1),
    new NoteData(67, 2, 2, 0, 0, 0, 0, 0),
    new NoteData(67, 2, 2, 1, 0, 0, 0, 0),
    new NoteData(67, 3, 2, 0, 0, 0, 0, 0),

    // Triple
    new NoteData(67, 3, 4, 2, 0, 0, 0, 0),
    new NoteData(67, 3, 4, 3, 0, 0, 0, 0),
    new NoteData(68, 0, 2, 0, 0, 0, 0, 0),

    new NoteData(68, 0, 2, 1, 0, 0, 0, 1),
    new NoteData(68, 1, 2, 0, 0, 0, 0, 0),
    new NoteData(68, 1, 2, 1, 0, 0, 0, 1),
    new NoteData(68, 2, 2, 0, 0, 0, 0, 0),

    // Triple
    new NoteData(68, 2, 4, 2, 0, 0, 0, 1),
    new NoteData(68, 2, 4, 3, 0, 0, 0, 1),
    new NoteData(68, 3, 2, 0, 0, 0, 0, 1),

    new NoteData(68, 3, 2, 1, 0, 0, 0, 0),
    new NoteData(69, 0, 2, 0, 0, 0, 0, 1),
    new NoteData(69, 0, 2, 1, 0, 0, 0, 0),
    new NoteData(69, 1, 2, 0, 0, 0, 0, 1),
    new NoteData(69, 1, 2, 1, 0, 0, 0, 0),
    new NoteData(69, 2, 2, 0, 0, 0, 0, 1),
    new NoteData(69, 2, 2, 1, 0, 0, 0, 0),
    new NoteData(69, 3, 2, 0, 0, 0, 0, 1),
    new NoteData(69, 3, 2, 1, 0, 0, 0, 0),

    new NoteData(70, 0, 2, 0, 0, 0, 0, 1),
    new NoteData(70, 0, 2, 1, 0, 0, 0, 1),
    new NoteData(70, 1, 2, 0, 0, 0, 0, 1),
    new NoteData(70, 1, 2, 1, 0, 0, 0, 0),
    new NoteData(70, 2, 2, 0, 0, 0, 0, 0),
    new NoteData(70, 2, 2, 1, 0, 0, 0, 0),
    new NoteData(70, 3, 2, 0, 0, 0, 0, 1),
    new NoteData(70, 3, 2, 1, 0, 0, 0, 0),

    new NoteData(71, 0, 1, 0, 1, 1, 1, 1),
    new NoteData(71, 1, 1, 0, 1, 1, 1, 0),
    new NoteData(71, 2, 1, 0, 1, 1, 1, 1),

    // Triple
    new NoteData(71, 3, 4, 2, 0, 0, 0, 0),
    new NoteData(71, 3, 4, 3, 0, 0, 0, 0),
    new NoteData(72, 0, 2, 0, 0, 0, 0, 0),

    // Kinda hard here
    //new NoteData(72, 1, 2, 0, 3, 0, 0, 1),
    new NoteData(72, 1, 2, 0, 1, 1, 1, 0),
    new NoteData(72, 2, 2, 0, 1, 1, 1, 1),
    new NoteData(72, 3, 2, 0, 3, 0, 0, 0),

    // End
    new NoteData(73, 0, 1, 0, 1, 1, 8, 1),
    new NoteData(75, 0, 1, 0, 1, 1, 6, 0),
    new NoteData(76, 2, 1, 0, 1, 1, 2, 1),
    new NoteData(77, 0, 1, 0, 1, 1, 4, 0),
    new NoteData(78, 0, 1, 0, 1, 1, 4, 1),
    new NoteData(79, 0, 1, 0, 1, 2, 13, 0),
    new NoteData(80, 3, 2, 0, 3, 0, 0, 1),
    new NoteData(80, 3, 2, 1, 0, 0, 0, 0),
    new NoteData(81, 0, 1, 0, 0, 0, 0, 0),
];

const ByeOrNotEasyMap = [
    // new NoteData(0, 0, 1, 0, 1, 1, 8, 0),
    // new NoteData(2, 0, 1, 0, 1, 1, 6, 1),
    // new NoteData(3, 2, 1, 0, 1, 1, 2, 0),
    // new NoteData(4, 0, 1, 0, 1, 1, 4, 1),
    // new NoteData(5, 0, 1, 0, 1, 1, 4, 0),
    // new NoteData(6, 0, 1, 0, 1, 1, 8, 1),
    new NoteData(0, 0, 1, 0, 1, 1, 4, 0),
    new NoteData(2, 0, 1, 0, 1, 1, 4, 1),
    new NoteData(4, 0, 1, 0, 1, 1, 4, 0),
    new NoteData(6, 0, 1, 0, 1, 1, 4, 1),

    new NoteData(8, 0, 1, 0, 0, 0, 0, 0),
    new NoteData(8, 2, 1, 0, 0, 0, 0, 0),

    new NoteData(9, 0, 1, 0, 0, 0, 0, 0),
    new NoteData(9, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(9, 2, 1, 0, 0, 0, 0, 0),

    new NoteData(10, 0, 1, 0, 0, 0, 0, 1),
    new NoteData(10, 2, 1, 0, 0, 0, 0, 1),

    new NoteData(11, 0, 1, 0, 0, 0, 0, 1),
    new NoteData(11, 1, 1, 0, 0, 0, 0, 1),
    new NoteData(11, 2, 1, 0, 0, 0, 0, 1),

    new NoteData(12, 0, 1, 0, 0, 0, 0, 0),
    new NoteData(12, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(12, 2, 1, 0, 0, 0, 0, 0),

    new NoteData(13, 0, 1, 0, 0, 0, 0, 1),
    new NoteData(13, 1, 1, 0, 0, 0, 0, 1),
    new NoteData(13, 2, 1, 0, 0, 0, 0, 1),

    new NoteData(14, 0, 1, 0, 0, 0, 0, 0),
    new NoteData(14, 1, 1, 0, 0, 0, 0, 1),
    new NoteData(14, 2, 1, 0, 0, 0, 0, 0),
    new NoteData(14, 3, 1, 0, 0, 0, 0, 1),

    new NoteData(15, 0, 1, 0, 0, 0, 0, 0), // Build up *Good
    new NoteData(15, 1, 1, 0, 0, 0, 0, 0), //*Bye
    new NoteData(15, 2, 2, 0, 0, 0, 0, 1), // Ma
    new NoteData(15, 2, 2, 1, 0, 0, 0, 1), // Ta
    new NoteData(15, 3, 1, 0, 0, 0, 0, 1), // Ne
    
    // Bass spam
    new NoteData(16, 0, 4, 0, 0, 0, 0, 0),
    new NoteData(16, 3, 1, 0, 3, 0, 0, 0),

    new NoteData(17, 0, 1, 0, 1, 1, 1, 1), // Hype
    // Different rhytnm
    new NoteData(17, 2, 4, 0, 3, 0, 0, 0),
    new NoteData(17, 2, 4, 3, 3, 0, 0, 0),
    new NoteData(17, 3, 4, 2, 3, 0, 0, 0),

    new NoteData(18, 1, 1, 0, 0, 0, 0, 1),
    new NoteData(18, 2, 1, 0, 0, 0, 0, 1),
    new NoteData(18, 3, 2, 0, 0, 0, 0, 1),
    new NoteData(18, 3, 2, 1, 0, 0, 0, 1),
    new NoteData(19, 0, 1, 0, 0, 0, 0, 1),

    new NoteData(19, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(19, 2, 1, 0, 0, 0, 0, 0),
    new NoteData(19, 3, 2, 0, 0, 0, 0, 0),
    new NoteData(19, 3, 2, 1, 0, 0, 0, 0),
    new NoteData(20, 0, 1, 0, 0, 0, 0, 0),

    new NoteData(20, 1, 1, 0, 0, 0, 0, 1),
    new NoteData(20, 2, 1, 0, 0, 0, 0, 1),
    new NoteData(20, 3, 1, 0, 0, 0, 0, 1),
    new NoteData(21, 0, 1, 0, 0, 0, 0, 1),
    new NoteData(21, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(21, 2, 1, 0, 0, 0, 0, 0),

    new NoteData(21, 3, 1, 0, 1, 1, 1, 0),
    
    new NoteData(22, 1, 1, 0, 0, 0, 0, 1),
    new NoteData(22, 2, 1, 0, 0, 0, 0, 1),
    new NoteData(22, 3, 2, 0, 0, 0, 0, 1),
    new NoteData(22, 3, 2, 1, 0, 0, 0, 1),
    new NoteData(23, 0, 1, 0, 0, 0, 0, 1),

    new NoteData(23, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(23, 2, 1, 0, 0, 0, 0, 0),
    new NoteData(23, 3, 1, 0, 0, 0, 0, 0),

    new NoteData(24, 0, 1, 0, 0, 0, 0, 1), //  Good
    new NoteData(24, 1, 1, 0, 0, 0, 0, 1), // Bye
    new NoteData(24, 2, 2, 0, 0, 0, 0, 1), // Ma
    new NoteData(24, 2, 2, 1, 0, 0, 0, 1), // Ta
    new NoteData(24, 3, 1, 0, 0, 0, 0, 1), // Ne

    //new NoteData(25, 0, 1, 0, 1, 1, 1, 0),
    new NoteData(25, 1, 1, 0, 3, 0, 0, 0),

    new NoteData(25, 2, 1, 0, 0, 0, 0, 0),

    new NoteData(25, 3, 2, 0, 0, 0, 0, 1),
    //new NoteData(25, 3, 2, 1, 0, 0, 0, 1),
    new NoteData(26, 0, 1, 0, 0, 0, 0, 1),
    
    new NoteData(26, 1, 1, 0, 0, 0, 0, 1),
    new NoteData(26, 2, 1, 0, 0, 0, 0, 1),
    new NoteData(26, 3, 1, 0, 1, 1, 1, 1),

    new NoteData(27, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(27, 2, 1, 0, 0, 0, 0, 0),
    new NoteData(27, 3, 2, 0, 0, 0, 0, 1),
    new NoteData(27, 3, 2, 1, 0, 0, 0, 1),
    new NoteData(28, 0, 1, 0, 0, 0, 0, 1),

    new NoteData(28, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(28, 2, 1, 0, 0, 0, 0, 0),
    new NoteData(28, 3, 1, 0, 1, 1, 1, 1),
    new NoteData(29, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(29, 2, 1, 0, 0, 0, 0, 0),

    new NoteData(29, 3, 2, 0, 0, 0, 0, 1),
    new NoteData(29, 3, 2, 1, 0, 0, 0, 1),
    new NoteData(30, 0, 1, 0, 0, 0, 0, 1),

    new NoteData(30, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(30, 2, 1, 0, 0, 0, 0, 1),
    new NoteData(30, 3, 1, 0, 0, 0, 0, 0),
    new NoteData(31, 0, 1, 0, 0, 0, 0, 1),

    // Double distinguish beat
    new NoteData(31, 1, 4, 3, 3, 0, 0, 0),
    new NoteData(31, 2, 2, 1, 3, 0, 0, 0),

    new NoteData(32, 0, 1, 0, 0, 0, 0, 1),
    new NoteData(32, 1, 1, 0, 0, 0, 0, 1),
    new NoteData(32, 2, 1, 0, 0, 0, 0, 0),
    new NoteData(32, 3, 1, 0, 0, 0, 0, 0),

    new NoteData(33, 0, 1, 0, 1, 1, 1, 1),
    new NoteData(33, 2, 2, 0, 0, 0, 0, 0),
    new NoteData(33, 2, 2, 1, 0, 0, 0, 0),
    new NoteData(33, 3, 1, 0, 1, 1, 1, 0),

    //new NoteData(34, 0, 1, 0, 0, 0, 0, 1),
    new NoteData(34, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(34, 2, 2, 0, 0, 0, 0, 0),
    new NoteData(34, 2, 2, 1, 0, 0, 0, 0),

    new NoteData(34, 3, 2, 1, 0, 0, 0, 0),
    new NoteData(35, 1, 1, 0, 0, 0, 0, 1),
    new NoteData(35, 2, 1, 0, 1, 1, 2, 1),
    new NoteData(36, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(36, 2, 1, 0, 0, 0, 0, 0),
    new NoteData(36, 3, 1, 0, 0, 0, 0, 0),
    new NoteData(37, 0, 1, 0, 0, 0, 0, 1),
    new NoteData(37, 1, 1, 0, 0, 0, 0, 1),

    new NoteData(37, 2, 2, 0, 0, 0, 0, 0),
    new NoteData(37, 2, 2, 1, 0, 0, 0, 0),
    new NoteData(37, 3, 2, 0, 0, 0, 0, 0),
    new NoteData(37, 3, 2, 1, 1, 2, 3, 1),

    // new NoteData(38, 0, 1, 0, 0, 0, 0, 1),
    // new NoteData(38, 1, 1, 0, 0, 0, 0, 1),
    new NoteData(38, 2, 2, 0, 0, 0, 0, 0),
    new NoteData(38, 2, 2, 1, 0, 0, 0, 0),

    new NoteData(38, 3, 2, 1, 3, 0, 0, 1),
    new NoteData(39, 0, 4, 1, 3, 0, 0, 1),

    new NoteData(39, 2, 1, 0, 1, 2, 3, 0),
    new NoteData(40, 2, 1, 0, 0, 0, 0, 0),
    new NoteData(40, 3, 1, 0, 0, 0, 0, 0),

    // No hit
    new NoteData(41, 0, 1, 0, 2, 0, 0, 1), 
    new NoteData(41, 1, 1, 0, 2, 0, 0, 1), 
    new NoteData(41, 2, 1, 0, 2, 0, 0, 1), 
    new NoteData(41, 3, 1, 0, 2, 0, 0, 1), 
    new NoteData(42, 0, 1, 0, 2, 0, 0, 0), 
    new NoteData(42, 1, 1, 0, 2, 0, 0, 0), 
    new NoteData(42, 2, 1, 0, 2, 0, 0, 0), 
    new NoteData(42, 3, 1, 0, 2, 0, 0, 0), 


    new NoteData(43, 0, 1, 0, 1, 1, 4, 1),
    new NoteData(44, 1, 1, 0, 0, 0, 0, 0), 
    new NoteData(44, 2, 2, 0, 0, 0, 0, 0), 
    new NoteData(44, 2, 2, 1, 0, 0, 0, 0), 
    new NoteData(44, 3, 1, 0, 0, 0, 0, 0), 

    new NoteData(45, 0, 1, 0, 2, 0, 0, 1), 
    new NoteData(45, 1, 1, 0, 2, 0, 0, 1), 
    new NoteData(45, 2, 1, 0, 2, 0, 0, 1), 
    new NoteData(45, 3, 1, 0, 2, 0, 0, 1), 
    new NoteData(46, 0, 1, 0, 2, 0, 0, 0), 
    new NoteData(46, 1, 1, 0, 2, 0, 0, 0), 
    new NoteData(46, 2, 1, 0, 2, 0, 0, 0), 
    new NoteData(46, 3, 1, 0, 2, 0, 0, 0), 

    new NoteData(47, 0, 1, 0, 0, 0, 0, 1), 
    new NoteData(47, 1, 1, 0, 0, 0, 0, 1), 
    new NoteData(47, 2, 1, 0, 0, 0, 0, 1), 
    new NoteData(47, 3, 1, 0, 0, 0, 0, 1), 

    new NoteData(48, 0, 1, 0, 0, 0, 0, 0), 
    new NoteData(48, 1, 1, 0, 0, 0, 0, 0), 
    new NoteData(48, 2, 1, 0, 0, 0, 0, 0), 
    new NoteData(48, 3, 1, 0, 1, 1, 1, 1), 

    new NoteData(49, 1, 1, 0, 0, 0, 0, 0), 
    new NoteData(49, 2, 1, 0, 0, 0, 0, 0), 
    new NoteData(49, 3, 2, 0, 0, 0, 0, 0), 
    new NoteData(49, 3, 2, 1, 0, 0, 0, 0), 
    new NoteData(50, 0, 1, 0, 0, 0, 0, 0), 

    new NoteData(50, 1, 1, 0, 0, 0, 0, 1), 
    new NoteData(50, 2, 1, 0, 0, 0, 0, 1), 
    new NoteData(50, 3, 1, 0, 0, 0, 0, 1), 

    new NoteData(51, 0, 2, 0, 0, 0, 0, 1), 
    new NoteData(51, 0, 2, 1, 0, 0, 0, 1), 
    new NoteData(51, 1, 1, 0, 0, 0, 0, 1), 

    new NoteData(51, 2, 1, 0, 0, 0, 0, 0), 
    new NoteData(51, 3, 1, 0, 0, 0, 0, 0), 
    new NoteData(52, 0, 1, 0, 0, 0, 0, 0), 
    new NoteData(52, 1, 2, 0, 0, 0, 0, 0), 
    new NoteData(52, 1, 2, 1, 0, 0, 0, 0), 
    new NoteData(52, 2, 1, 0, 0, 0, 0, 0), 

    new NoteData(52, 3, 1, 0, 0, 0, 0, 1), 
    new NoteData(53, 0, 1, 0, 1, 1, 1, 0), 
    new NoteData(53, 2, 1, 0, 1, 1, 1, 1), 
    new NoteData(54, 0, 1, 0, 1, 1, 1, 0), 
    new NoteData(54, 2, 1, 0, 1, 1, 1, 1), 

    new NoteData(55, 0, 2, 0, 0, 0, 0, 0), 
    new NoteData(55, 0, 2, 1, 0, 0, 0, 0), 
    new NoteData(55, 1, 2, 0, 0, 0, 0, 0), 
    new NoteData(55, 1, 2, 1, 0, 0, 0, 0), 
    new NoteData(55, 2, 2, 0, 0, 0, 0, 1), 
    new NoteData(55, 2, 2, 1, 0, 0, 0, 1), 
    new NoteData(55, 3, 2, 0, 0, 0, 0, 1), 
    new NoteData(55, 3, 2, 1, 0, 0, 0, 1), 

    new NoteData(56, 0, 2, 0, 3, 0, 0, 1), // Second verse start * Good
    new NoteData(56, 3, 1, 0, 3, 0, 0, 1),

    new NoteData(57, 0, 1, 0, 1, 1, 1, 0), // Big impact
    new NoteData(57, 2, 1, 0, 0, 0, 0, 0),

    new NoteData(57, 3, 2, 0, 0, 0, 0, 1),
    new NoteData(57, 3, 2, 1, 0, 0, 0, 1),
    new NoteData(58, 0, 1, 0, 0, 0, 0, 1),

    new NoteData(58, 1, 1, 0, 1, 1, 1, 0),
    new NoteData(58, 3, 1, 0, 0, 0, 0, 0),

    new NoteData(59, 0, 1, 0, 1, 1, 1, 1),
    new NoteData(59, 2, 1, 0, 1, 1, 1, 0),

    new NoteData(60, 0, 1, 0, 0, 0, 0, 1),
    new NoteData(60, 1, 1, 0, 0, 0, 0, 1),
    new NoteData(60, 2, 1, 0, 0, 0, 0, 0),
    new NoteData(60, 3, 1, 0, 0, 0, 0, 0),

    new NoteData(61, 0, 1, 0, 1, 1, 1, 1),
    new NoteData(61, 2, 1, 0, 0, 0, 0, 1),

    new NoteData(61, 3, 2, 0, 0, 0, 0, 0),
    new NoteData(61, 3, 2, 1, 0, 0, 0, 0),
    new NoteData(62, 0, 1, 0, 0, 0, 0, 0),

    new NoteData(62, 1, 1, 0, 1, 1, 1, 1),
    new NoteData(62, 3, 1, 0, 0, 0, 0, 0),
    new NoteData(63, 0, 1, 0, 0, 0, 0, 1),
    new NoteData(63, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(63, 2, 1, 0, 0, 0, 0, 1),

    new NoteData(63, 3, 2, 0, 0, 0, 0, 0),
    new NoteData(63, 3, 2, 1, 0, 0, 0, 0),
    new NoteData(64, 0, 1, 0, 0, 0, 0, 0),
    new NoteData(64, 1, 1, 0, 0, 0, 0, 1),
    new NoteData(64, 2, 1, 0, 0, 0, 0, 0),
    new NoteData(64, 3, 1, 0, 0, 0, 0, 1),

    new NoteData(65, 1, 1, 0, 3, 0, 0, 1),
    new NoteData(65, 2, 1, 0, 0, 0, 0, 0),

    new NoteData(65, 3, 2, 0, 0, 0, 0, 1),
    new NoteData(65, 3, 2, 1, 0, 0, 0, 1),
    new NoteData(66, 0, 1, 0, 0, 0, 0, 1),

    new NoteData(66, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(66, 2, 1, 0, 0, 0, 0, 1),
    new NoteData(66, 3, 1, 0, 1, 1, 1, 0),

    new NoteData(67, 1, 1, 0, 0, 0, 0, 1),
    new NoteData(67, 2, 1, 0, 0, 0, 0, 0),
    new NoteData(67, 3, 1, 0, 0, 0, 0, 1),

    new NoteData(68, 0, 1, 0, 1, 1, 1, 0),
    new NoteData(68, 2, 1, 0, 0, 0, 0, 0),

    new NoteData(68, 3, 2, 0, 0, 0, 0, 1),
    new NoteData(68, 3, 2, 1, 0, 0, 0, 1),
    new NoteData(69, 0, 1, 0, 0, 0, 0, 1),
    new NoteData(69, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(69, 2, 1, 0, 0, 0, 0, 1),

    new NoteData(69, 3, 2, 0, 0, 0, 0, 0),
    new NoteData(69, 3, 2, 1, 0, 0, 0, 0),
    new NoteData(70, 0, 1, 0, 0, 0, 0, 0),
    new NoteData(70, 1, 1, 0, 0, 0, 0, 1),
    new NoteData(70, 2, 1, 0, 0, 0, 0, 0),

    new NoteData(70, 3, 2, 0, 0, 0, 0, 1),
    new NoteData(70, 3, 2, 1, 0, 0, 0, 1),
    new NoteData(71, 0, 1, 0, 0, 0, 0, 1),

    new NoteData(71, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(71, 2, 1, 0, 0, 0, 0, 1),

    new NoteData(71, 3, 2, 0, 0, 0, 0, 1),
    new NoteData(71, 3, 2, 1, 0, 0, 0, 1),
    new NoteData(72, 0, 1, 0, 0, 0, 0, 1),

    new NoteData(72, 1, 1, 0, 3, 0, 0, 0),
    new NoteData(72, 2, 1, 0, 0, 0, 0, 1),
    new NoteData(72, 3, 1, 0, 3, 0, 0, 0),

    new NoteData(73, 0, 1, 0, 1, 1, 4, 1),
    new NoteData(75, 0, 1, 0, 1, 1, 4, 0),
    new NoteData(77, 0, 1, 0, 1, 1, 4, 1),
    new NoteData(79, 0, 1, 0, 1, 1, 4, 0),

    new NoteData(80, 2, 2, 1, 3, 0, 0, 1),
    //new NoteData(80, 3, 1, 0, 1, 1, 1, 1),
];

const NiniHardMap = [
    // First Intro
    new NoteData(0, 0, 1, 0, 3, 0, 0, 1),

    new NoteData(0, 1, 2, 0, 0, 0, 0, 1),
    new NoteData(0, 1, 2, 1, 0, 0, 0, 1),
    new NoteData(0, 2, 2, 1, 0, 0, 0, 1),
    new NoteData(0, 3, 2, 0, 0, 0, 0, 1),

    new NoteData(1, 0, 2, 0, 0, 0, 0, 0),
    new NoteData(1, 1, 2, 0, 0, 0, 0, 0),
    new NoteData(1, 2, 2, 0, 0, 0, 0, 0),

    new NoteData(2, 0, 2, 0, 0, 0, 0, 1),
    new NoteData(2, 1, 2, 0, 0, 0, 0, 1),
    new NoteData(2, 2, 2, 0, 0, 0, 0, 1),
    new NoteData(2, 2, 2, 1, 0, 0, 0, 1),
    new NoteData(2, 3, 2, 0, 0, 0, 0, 1),

    new NoteData(3, 0, 2, 0, 0, 0, 0, 0),
    new NoteData(3, 1, 2, 0, 0, 0, 0, 0),
    new NoteData(3, 2, 2, 0, 0, 0, 0, 0),
    new NoteData(3, 2, 2, 1, 0, 0, 0, 0),
    new NoteData(3, 3, 2, 0, 0, 0, 0, 0),

    new NoteData(4, 0, 2, 0, 0, 0, 0, 1),
    new NoteData(4, 1, 2, 0, 0, 0, 0, 1),
    new NoteData(4, 2, 2, 0, 0, 0, 0, 1),
    new NoteData(4, 2, 2, 1, 0, 0, 0, 1),
    new NoteData(4, 3, 2, 0, 0, 0, 0, 1),

    new NoteData(5, 0, 2, 0, 0, 0, 0, 0),
    new NoteData(5, 1, 2, 0, 0, 0, 0, 0),
    new NoteData(5, 2, 2, 0, 0, 0, 0, 0),
    new NoteData(5, 2, 2, 1, 0, 0, 0, 0),
    new NoteData(5, 3, 2, 0, 0, 0, 0, 0),

    new NoteData(6, 0, 2, 0, 0, 0, 0, 1),
    new NoteData(6, 1, 2, 0, 0, 0, 0, 1),
    new NoteData(6, 2, 2, 0, 0, 0, 0, 1),
    new NoteData(6, 2, 2, 1, 0, 0, 0, 1),
    new NoteData(6, 3, 2, 0, 0, 0, 0, 1),
    new NoteData(7, 0, 2, 0, 3, 0, 0, 1),

    // Second Intro
    new NoteData(8, 0, 2, 0, 0, 0, 0, 1),
    new NoteData(8, 1, 2, 1, 0, 0, 0, 1),
    new NoteData(8, 3, 2, 1, 0, 0, 0, 1),
    new NoteData(9, 0, 2, 0, 0, 0, 0, 1),
    new NoteData(9, 1, 2, 1, 0, 0, 0, 1),

    new NoteData(10, 0, 2, 0, 0, 0, 0, 0),
    new NoteData(10, 1, 2, 1, 0, 0, 0, 0),
    new NoteData(10, 3, 2, 1, 0, 0, 0, 0),
    new NoteData(11, 0, 4, 0, 0, 0, 0, 0),
    new NoteData(11, 0, 4, 3, 0, 0, 0, 0),
    new NoteData(11, 1, 2, 1, 0, 0, 0, 0),
    new NoteData(11, 3, 2, 0, 3, 0, 0, 0),

    // Triple
    new NoteData(11, 3, 4, 2, 0, 0, 0, 1),
    new NoteData(11, 3, 4, 3, 0, 0, 0, 1),
    new NoteData(12, 0, 2, 0, 0, 0, 0, 1),
    
    new NoteData(12, 0, 2, 1, 0, 0, 0, 0),
    new NoteData(12, 1, 2, 0, 0, 0, 0, 1),
    new NoteData(12, 1, 2, 1, 0, 0, 0, 1),
    new NoteData(12, 2, 2, 0, 0, 0, 0, 1),
    new NoteData(12, 2, 2, 1, 0, 0, 0, 0),
    new NoteData(12, 3, 2, 0, 0, 0, 0, 1),
    new NoteData(12, 3, 2, 1, 0, 0, 0, 0),
    new NoteData(13, 0, 2, 0, 0, 0, 0, 1),
    new NoteData(13, 0, 2, 1, 0, 0, 0, 0),
    new NoteData(13, 1, 2, 0, 0, 0, 0, 1),
    new NoteData(13, 1, 2, 1, 0, 0, 0, 0),

    new NoteData(13, 2, 2, 0, 0, 0, 0, 1),
    new NoteData(13, 2, 2, 1, 0, 0, 0, 0),
    new NoteData(13, 3, 2, 0, 0, 0, 0, 0),
    new NoteData(13, 3, 2, 1, 0, 0, 0, 0),
    new NoteData(14, 0, 2, 0, 0, 0, 0, 1),
    new NoteData(14, 0, 2, 1, 0, 0, 0, 1),

    // Spam Up
    new NoteData(14, 1, 2, 0, 0, 0, 0, 0),
    new NoteData(14, 1, 2, 1, 0, 0, 0, 0),
    new NoteData(14, 2, 2, 0, 0, 0, 0, 0),
    new NoteData(14, 2, 2, 1, 0, 0, 0, 0),
    new NoteData(14, 3, 2, 0, 0, 0, 0, 0),
    new NoteData(14, 3, 2, 1, 0, 0, 0, 0),
    new NoteData(15, 0, 2, 0, 3, 0, 0, 0),

    new NoteData(15, 1, 2, 1, 0, 0, 0, 0),
    new NoteData(15, 2, 2, 0, 3, 0, 0, 0),

    new NoteData(15, 3, 2, 1, 0, 0, 0, 1),
    new NoteData(16, 0, 2, 0, 3, 0, 0, 1),

    new NoteData(17, 0, 2, 0, 2, 0, 0, 1),
    new NoteData(18, 0, 2, 0, 2, 0, 0, 0),
    new NoteData(19, 0, 2, 0, 2, 0, 0, 1),

    new NoteData(19, 3, 2, 0, 3, 0, 0, 0),
    new NoteData(20, 0, 2, 0, 3, 0, 0, 0),

    new NoteData(21, 0, 2, 0, 2, 0, 0, 1),
    new NoteData(22, 0, 2, 0, 2, 0, 0, 0),
    new NoteData(23, 0, 2, 0, 2, 0, 0, 1),

    // Dubstep
    new NoteData(23, 2, 4, 0, 0, 0, 0, 0),
    new NoteData(23, 2, 4, 1, 0, 0, 0, 0),
    new NoteData(23, 2, 4, 2, 0, 0, 0, 0),
    new NoteData(23, 2, 4, 3, 0, 0, 0, 0),
    new NoteData(23, 3, 4, 0, 1, 1, 1, 0),

    new NoteData(24, 0, 2, 0, 0, 0, 0, 1),
    new NoteData(24, 0, 2, 1, 0, 0, 0, 1),
    new NoteData(24, 1, 2, 0, 0, 0, 0, 0),
    new NoteData(24, 1, 2, 1, 0, 0, 0, 0),

    // Special
    new NoteData(24, 2, 2, 0, 1, 2, 1, 1),
    new NoteData(24, 2, 2, 1, 1, 2, 2, 0),

    new NoteData(24, 3, 4, 0, 0, 0, 0, 1),
    new NoteData(24, 3, 4, 2, 0, 0, 0, 0),
    new NoteData(24, 3, 4, 3, 0, 0, 0, 0),
    new NoteData(24, 3, 4, 4, 0, 0, 0, 0),

    new NoteData(25, 0, 2, 1, 0, 0, 0, 1),
    new NoteData(25, 1, 2, 0, 0, 0, 0, 1),
    new NoteData(25, 1, 2, 1, 0, 0, 0, 1),

    new NoteData(25, 2, 4, 0, 0, 0, 0, 0),
    new NoteData(25, 2, 4, 1, 0, 0, 0, 0),
    new NoteData(25, 2, 4, 2, 0, 0, 0, 0),
    new NoteData(25, 2, 4, 3, 0, 0, 0, 0),
    new NoteData(25, 2, 4, 4, 0, 0, 0, 0),

    new NoteData(26, 0, 1, 0, 1, 1, 1, 1),
    new NoteData(26, 1, 4, 0, 0, 0, 0, 0),
    new NoteData(26, 1, 4, 2, 0, 0, 0, 0),
    new NoteData(26, 1, 4, 3, 0, 0, 0, 0),
    new NoteData(26, 1, 4, 4, 0, 0, 0, 0),

    new NoteData(26, 2, 2, 1, 0, 0, 0, 1),
    new NoteData(26, 3, 2, 0, 0, 0, 0, 0),
    new NoteData(26, 3, 2, 1, 0, 0, 0, 1),
    new NoteData(27, 0, 1, 0, 1, 1, 1, 0),
    new NoteData(27, 1, 2, 0, 0, 0, 0, 1),
    new NoteData(27, 1, 2, 1, 0, 0, 0, 1),

    // AHHH
    new NoteData(27, 2, 1, 0, 1, 2, 1, 0),
    new NoteData(27, 3, 2, 0, 0, 0, 0, 1),
    new NoteData(28, 0, 2, 0, 3, 0, 0, 1),

    new NoteData(28, 1, 4, 0, 0, 0, 0, 0),
    new NoteData(28, 1, 4, 1, 0, 0, 0, 0),
    new NoteData(28, 1, 4, 2, 0, 0, 0, 0),
    new NoteData(28, 1, 4, 3, 0, 0, 0, 0),

    // Special
    new NoteData(28, 2, 2, 0, 1, 2, 1, 0),
    new NoteData(28, 2, 2, 1, 1, 2, 2, 1),

    new NoteData(28, 3, 4, 0, 0, 0, 0, 0),
    new NoteData(28, 3, 4, 2, 0, 0, 0, 1),
    new NoteData(28, 3, 4, 3, 0, 0, 0, 1),
    new NoteData(28, 3, 4, 4, 0, 0, 0, 1),

    new NoteData(29, 0, 2, 1, 0, 0, 0, 0),
    new NoteData(29, 1, 2, 0, 0, 0, 0, 0),
    new NoteData(29, 1, 2, 1, 0, 0, 0, 0),

    new NoteData(29, 2, 4, 0, 0, 0, 0, 1),
    new NoteData(29, 2, 4, 1, 0, 0, 0, 1),
    new NoteData(29, 2, 4, 2, 0, 0, 0, 1),
    new NoteData(29, 2, 4, 3, 0, 0, 0, 1),
    new NoteData(29, 3, 1, 0, 1, 1, 1, 1),

    new NoteData(30, 1, 4, 0, 0, 0, 0, 0),
    new NoteData(30, 1, 4, 2, 0, 0, 0, 1),
    new NoteData(30, 1, 4, 3, 0, 0, 0, 1),
    new NoteData(30, 2, 2, 0, 0, 0, 0, 1),
    new NoteData(30, 2, 2, 1, 0, 0, 0, 0),
    new NoteData(30, 3, 2, 0, 0, 0, 0, 1),
    new NoteData(30, 3, 2, 1, 0, 0, 0, 0),

    new NoteData(31, 0, 2, 0, 1, 2, 1, 1),
    new NoteData(31, 0, 2, 1, 1, 2, 2, 0),

    new NoteData(31, 1, 2, 1, 1, 2, 2, 1),
    new NoteData(31, 2, 2, 0, 1, 2, 1, 0),

    new NoteData(31, 3, 4, 0, 0, 0, 0, 1),
    new NoteData(31, 3, 4, 1, 0, 0, 0, 1),
    new NoteData(31, 3, 4, 2, 0, 0, 0, 1),
    new NoteData(31, 3, 4, 3, 0, 0, 0, 1),
    new NoteData(32, 0, 1, 0, 3, 0, 0, 1),

    new NoteData(32, 1, 2, 0, 0, 0, 0, 0),
    new NoteData(32, 1, 2, 1, 0, 0, 0, 0),

    // Special
    new NoteData(32, 2, 2, 0, 1, 2, 1, 1),
    new NoteData(32, 2, 2, 1, 1, 2, 2, 0),

    new NoteData(32, 3, 4, 0, 0, 0, 0, 1),
    new NoteData(32, 3, 4, 2, 0, 0, 0, 0),
    new NoteData(32, 3, 4, 3, 0, 0, 0, 0),
    new NoteData(32, 3, 4, 4, 0, 0, 0, 0),

    new NoteData(33, 0, 2, 1, 0, 0, 0, 1),
    new NoteData(33, 1, 2, 0, 0, 0, 0, 1),
    new NoteData(33, 1, 2, 1, 0, 0, 0, 1),

    new NoteData(33, 2, 4, 0, 0, 0, 0, 0),
    new NoteData(33, 2, 4, 1, 0, 0, 0, 0),
    new NoteData(33, 2, 4, 2, 0, 0, 0, 0),
    new NoteData(33, 2, 4, 3, 0, 0, 0, 0),
    new NoteData(33, 2, 4, 4, 0, 0, 0, 0),

    new NoteData(34, 0, 1, 0, 1, 1, 1, 1),
    new NoteData(34, 1, 4, 0, 0, 0, 0, 0),
    new NoteData(34, 1, 4, 2, 0, 0, 0, 0),
    new NoteData(34, 1, 4, 3, 0, 0, 0, 0),
    new NoteData(34, 1, 4, 4, 0, 0, 0, 0),

    new NoteData(34, 2, 2, 1, 0, 0, 0, 1),
    new NoteData(34, 3, 2, 0, 0, 0, 0, 0),
    new NoteData(34, 3, 2, 1, 0, 0, 0, 1),
    new NoteData(35, 0, 1, 0, 1, 1, 1, 0),
    new NoteData(35, 1, 2, 0, 0, 0, 0, 1),
    new NoteData(35, 1, 2, 1, 0, 0, 0, 1),

    // AHHH
    new NoteData(35, 2, 1, 0, 1, 2, 1, 0),
    new NoteData(35, 3, 2, 0, 0, 0, 0, 1),
    new NoteData(36, 0, 2, 0, 3, 0, 0, 1),

    new NoteData(36, 1, 4, 0, 0, 0, 0, 0),
    new NoteData(36, 1, 4, 1, 0, 0, 0, 0),
    new NoteData(36, 1, 4, 2, 0, 0, 0, 0),
    new NoteData(36, 1, 4, 3, 0, 0, 0, 0),

    // Special
    new NoteData(36, 2, 2, 0, 1, 2, 1, 1),
    new NoteData(36, 2, 2, 1, 1, 2, 2, 0),

    new NoteData(36, 3, 4, 0, 0, 0, 0, 1),
    new NoteData(36, 3, 4, 2, 0, 0, 0, 0),
    new NoteData(36, 3, 4, 3, 0, 0, 0, 0),
    new NoteData(36, 3, 4, 4, 0, 0, 0, 0),

    new NoteData(37, 0, 2, 1, 0, 0, 0, 1),
    new NoteData(37, 1, 2, 0, 0, 0, 0, 0),
    new NoteData(37, 1, 2, 1, 0, 0, 0, 1),

    new NoteData(37, 2, 4, 0, 0, 0, 0, 0),
    new NoteData(37, 2, 4, 1, 0, 0, 0, 0),
    new NoteData(37, 2, 4, 2, 0, 0, 0, 0),
    new NoteData(37, 2, 4, 3, 0, 0, 0, 0),
    new NoteData(37, 3, 1, 0, 1, 1, 1, 0),

    new NoteData(38, 1, 4, 0, 0, 0, 0, 1),
    new NoteData(38, 1, 4, 2, 0, 0, 0, 0),
    new NoteData(38, 1, 4, 3, 0, 0, 0, 0),
    new NoteData(38, 2, 2, 0, 0, 0, 0, 0),
    new NoteData(38, 2, 2, 1, 0, 0, 0, 1),
    new NoteData(38, 3, 2, 0, 0, 0, 0, 0),
    new NoteData(38, 3, 2, 1, 0, 0, 0, 1),

    new NoteData(39, 0, 2, 0, 1, 2, 1, 0),
    new NoteData(39, 0, 2, 1, 1, 2, 2, 1),
    new NoteData(39, 1, 1, 0, 3, 0, 0, 0),

    new NoteData(39, 2, 4, 0, 0, 0, 0, 0),
    new NoteData(39, 2, 4, 1, 0, 0, 0, 0),
    new NoteData(39, 2, 4, 2, 0, 0, 0, 0),
    new NoteData(39, 2, 4, 3, 0, 0, 0, 0),
    new NoteData(39, 3, 4, 0, 0, 0, 0, 0),
    new NoteData(39, 3, 4, 1, 0, 0, 0, 0),
    new NoteData(39, 3, 4, 2, 0, 0, 0, 0),
    new NoteData(39, 3, 4, 3, 0, 0, 0, 0),

    // new NoteData(39, 1, 2, 1, 1, 2, 2, 0),
    // new NoteData(39, 2, 2, 0, 1, 2, 1, 1),

    // new NoteData(39, 3, 4, 0, 0, 0, 0, 1),
    // new NoteData(39, 3, 4, 1, 0, 0, 0, 1),
    // new NoteData(39, 3, 4, 2, 0, 0, 0, 1),
    // new NoteData(39, 3, 4, 3, 0, 0, 0, 1),
    // new NoteData(40, 0, 1, 0, 3, 0, 0, 1),

    // new NoteData(40, 1, 2, 0, 0, 0, 0, 0),
    // new NoteData(40, 1, 2, 1, 0, 0, 0, 0),

    new NoteData(40, 2, 1, 0, 2, 0, 0, 1),
    new NoteData(41, 0, 1, 0, 2, 0, 0, 0),
    new NoteData(41, 2, 1, 0, 2, 0, 0, 1),
    new NoteData(42, 0, 1, 0, 2, 0, 0, 0),
    new NoteData(42, 3, 1, 0, 2, 0, 0, 1),
    new NoteData(43, 0, 1, 0, 2, 0, 0, 1),
    new NoteData(44, 0, 1, 0, 2, 0, 0, 0),
    new NoteData(44, 2, 1, 0, 2, 0, 0, 1),
    new NoteData(45, 0, 1, 0, 2, 0, 0, 0),
    new NoteData(45, 2, 1, 0, 2, 0, 0, 1),
    new NoteData(46, 0, 1, 0, 1, 1, 4, 0),

    // De de de deng
    new NoteData(47, 1, 1, 0, 0, 0, 0, 1),
    new NoteData(47, 2, 1, 0, 0, 0, 0, 1),
    new NoteData(47, 3, 1, 0, 0, 0, 0, 1),
    new NoteData(48, 0, 1, 0, 3, 0, 0, 1),


    new NoteData(48, 1, 2, 1, 0, 0, 0, 0),
    // Double
    new NoteData(48, 3, 2, 1, 0, 0, 0, 0),
    new NoteData(49, 0, 1, 0, 0, 0, 0, 0),

    new NoteData(49, 1, 2, 1, 0, 0, 0, 0),

    // Boom Boom
    new NoteData(49, 3, 2, 1, 3, 0, 0, 1),
    new NoteData(50, 0, 2, 0, 3, 0, 0, 1),
    
    new NoteData(50, 1, 2, 1, 0, 0, 0, 0),
    new NoteData(50, 3, 2, 1, 0, 0, 0, 0),
    new NoteData(51, 0, 2, 0, 0, 0, 0, 0),
    new NoteData(51, 0, 4, 3, 0, 0, 0, 0),
    new NoteData(51, 1, 2, 1, 0, 0, 0, 0),

    new NoteData(51, 2, 2, 1, 0, 0, 0, 1),
    new NoteData(51, 3, 2, 0, 3, 0, 0, 1),

    new NoteData(52, 0, 2, 0, 3, 0, 0, 0),
    new NoteData(52, 1, 2, 0, 0, 0, 0, 1),
    new NoteData(52, 2, 2, 0, 3, 0, 0, 0),
    new NoteData(52, 3, 2, 0, 0, 0, 0, 1),

    // Building
    new NoteData(53, 0, 2, 0, 3, 0, 0, 0),
    new NoteData(53, 0, 2, 1, 0, 0, 0, 1),
    new NoteData(53, 1, 2, 0, 3, 0, 0, 0),
    new NoteData(53, 1, 2, 1, 0, 0, 0, 1),
    new NoteData(53, 2, 2, 0, 3, 0, 0, 0),
    new NoteData(53, 2, 2, 1, 0, 0, 0, 1),
    new NoteData(53, 3, 2, 0, 3, 0, 0, 0),
    new NoteData(53, 3, 2, 1, 0, 0, 0, 1),

    new NoteData(54, 0, 2, 0, 3, 0, 0, 0),
    new NoteData(54, 0, 2, 1, 3, 0, 0, 0),
    new NoteData(54, 1, 2, 0, 3, 0, 0, 0),
    new NoteData(54, 1, 2, 1, 3, 0, 0, 0),

    new NoteData(54, 2, 2, 0, 3, 0, 0, 1),
    new NoteData(54, 2, 2, 1, 3, 0, 0, 1),
    new NoteData(54, 3, 2, 0, 3, 0, 0, 1),
    new NoteData(54, 3, 2, 1, 3, 0, 0, 1),

    new NoteData(55, 0, 1, 0, 2, 0, 0, 1),
    new NoteData(55, 1, 1, 0, 2, 0, 0, 1),
    new NoteData(55, 2, 1, 0, 2, 0, 0, 1),

    // Build Up!
    new NoteData(55, 3, 4, 0, 0, 0, 0, 1),
    new NoteData(55, 3, 4, 1, 0, 0, 0, 1),
    new NoteData(55, 3, 4, 2, 0, 0, 0, 1),
    new NoteData(55, 3, 4, 3, 0, 0, 0, 1),
    new NoteData(56, 0, 1, 0, 3, 0, 0, 1), // Ting

    new NoteData(56, 0, 2, 1, 0, 0, 0, 0),
    new NoteData(56, 1, 2, 0, 0, 0, 0, 0),

    new NoteData(56, 1, 2, 1, 1, 2, 3, 1), // Ting x2
    new NoteData(56, 2, 2, 1, 0, 0, 0, 0),
    new NoteData(56, 3, 2, 0, 0, 0, 0, 0), // Ting

    new NoteData(56, 3, 2, 1, 1, 2, 3, 1), // Ting
    new NoteData(57, 0, 2, 1, 0, 0, 0, 0),
    new NoteData(57, 1, 2, 0, 0, 0, 0, 0),
    new NoteData(57, 1, 2, 1, 0, 0, 0, 0),
    new NoteData(57, 2, 2, 0, 1, 2, 2, 1), // Ting
    new NoteData(57, 3, 4, 0, 0, 0, 0, 0),
    // Triple x3
    new NoteData(57, 3, 4, 2, 0, 0, 0, 0),
    new NoteData(57, 3, 4, 3, 0, 0, 0, 0),
    new NoteData(58, 0, 4, 0, 0, 0, 0, 0),

    new NoteData(58, 0, 4, 2, 0, 0, 0, 1),
    new NoteData(58, 0, 4, 3, 0, 0, 0, 1),
    new NoteData(58, 1, 4, 0, 0, 0, 0, 1),

    new NoteData(58, 1, 4, 2, 0, 0, 0, 0),
    new NoteData(58, 1, 4, 3, 0, 0, 0, 0),
    new NoteData(58, 2, 4, 0, 0, 0, 0, 0),

    new NoteData(58, 2, 2, 1, 0, 0, 0, 1),
    new NoteData(58, 3, 2, 0, 0, 0, 0, 1),
    new NoteData(58, 3, 2, 1, 0, 0, 0, 0),
    new NoteData(59, 0, 2, 0, 0, 0, 0, 0),

    // Triple x2
    new NoteData(59, 0, 4, 2, 0, 0, 0, 1),
    new NoteData(59, 0, 4, 3, 0, 0, 0, 1),
    new NoteData(59, 1, 4, 0, 0, 0, 0, 1),

    new NoteData(59, 1, 4, 2, 0, 0, 0, 0),
    new NoteData(59, 1, 4, 3, 0, 0, 0, 0),
    new NoteData(59, 2, 4, 0, 0, 0, 0, 0),

    new NoteData(59, 2, 2, 1, 3, 0, 0, 1),
    new NoteData(59, 3, 2, 0, 3, 0, 0, 1),

    new NoteData(59, 3, 4, 2, 0, 0, 0, 0),
    new NoteData(59, 3, 4, 3, 0, 0, 0, 0),
    new NoteData(60, 0, 4, 0, 0, 0, 0, 0),

    new NoteData(60, 0, 2, 1, 0, 0, 0, 1),
    new NoteData(60, 1, 2, 0, 0, 0, 0, 1),
    new NoteData(60, 1, 2, 1, 0, 0, 0, 0),

    new NoteData(60, 2, 2, 0, 0, 0, 0, 1),
    new NoteData(60, 2, 2, 1, 0, 0, 0, 1),
    new NoteData(60, 3, 2, 0, 0, 0, 0, 0),

    new NoteData(60, 3, 2, 1, 0, 0, 0, 1),
    new NoteData(61, 0, 2, 0, 0, 0, 0, 1),
    new NoteData(61, 0, 2, 1, 0, 0, 0, 0),

    new NoteData(61, 1, 2, 0, 0, 0, 0, 1),
    new NoteData(61, 1, 2, 1, 0, 0, 0, 1),
    new NoteData(61, 2, 2, 0, 0, 0, 0, 0),

    new NoteData(61, 2, 2, 1, 0, 0, 0, 1),
    new NoteData(61, 3, 2, 0, 0, 0, 0, 0),
    new NoteData(61, 3, 2, 1, 0, 0, 0, 1),

    new NoteData(62, 0, 2, 0, 0, 0, 0, 0),
    new NoteData(62, 0, 2, 1, 0, 0, 0, 1),
    new NoteData(62, 1, 2, 0, 0, 0, 0, 0),

    new NoteData(62, 1, 2, 1, 0, 0, 0, 1),
    new NoteData(62, 2, 2, 0, 0, 0, 0, 0),

    new NoteData(62, 2, 4, 2, 0, 0, 0, 1),
    new NoteData(62, 2, 4, 3, 0, 0, 0, 1),
    new NoteData(62, 3, 4, 0, 0, 0, 0, 1),

    new NoteData(62, 3, 2, 1, 0, 0, 0, 0),
    new NoteData(63, 0, 2, 0, 1, 2, 3, 1),

    // Triple
    new NoteData(63, 2, 4, 0, 0, 0, 0, 0),
    new NoteData(63, 2, 4, 1, 0, 0, 0, 0),
    new NoteData(63, 2, 4, 2, 0, 0, 0, 0),

    new NoteData(63, 3, 4, 0, 0, 0, 0, 1),
    new NoteData(64, 0, 2, 0, 3, 0, 0, 1),

    new NoteData(64, 0, 2, 1, 0, 0, 0, 0),
    new NoteData(64, 1, 2, 0, 0, 0, 0, 0),

    new NoteData(64, 1, 2, 1, 1, 2, 3, 1), // Ting x2
    new NoteData(64, 2, 2, 1, 0, 0, 0, 0),
    new NoteData(64, 3, 2, 0, 0, 0, 0, 0),

    new NoteData(64, 3, 2, 1, 1, 2, 3, 1),
    new NoteData(65, 0, 2, 1, 0, 0, 0, 0),
    new NoteData(65, 1, 2, 0, 0, 0, 0, 0),
    new NoteData(65, 1, 2, 1, 0, 0, 0, 0),
    new NoteData(65, 2, 2, 0, 1, 1, 1, 1), // Ting
    new NoteData(65, 3, 4, 0, 0, 0, 0, 0),

    // Triple x3
    new NoteData(65, 3, 4, 2, 0, 0, 0, 1),
    new NoteData(65, 3, 4, 3, 0, 0, 0, 1),
    new NoteData(66, 0, 4, 0, 0, 0, 0, 1),

    new NoteData(66, 0, 4, 2, 0, 0, 0, 0),
    new NoteData(66, 0, 4, 3, 0, 0, 0, 0),
    new NoteData(66, 1, 4, 0, 0, 0, 0, 0),

    new NoteData(66, 1, 4, 2, 0, 0, 0, 1),
    new NoteData(66, 1, 4, 3, 0, 0, 0, 1),
    new NoteData(66, 2, 4, 0, 0, 0, 0, 1),

    new NoteData(66, 2, 2, 1, 0, 0, 0, 0),
    new NoteData(66, 3, 2, 0, 0, 0, 0, 0),
    new NoteData(66, 3, 2, 1, 0, 0, 0, 1),
    new NoteData(67, 0, 2, 0, 0, 0, 0, 1),

    // Triple x2
    new NoteData(67, 0, 4, 2, 0, 0, 0, 0),
    new NoteData(67, 0, 4, 3, 0, 0, 0, 0),
    new NoteData(67, 1, 4, 0, 0, 0, 0, 0),

    new NoteData(67, 1, 4, 2, 0, 0, 0, 1),
    new NoteData(67, 1, 4, 3, 0, 0, 0, 1),
    new NoteData(67, 2, 4, 0, 0, 0, 0, 1),

    new NoteData(67, 2, 2, 1, 3, 0, 0, 0),
    new NoteData(67, 3, 2, 0, 3, 0, 0, 0),

    new NoteData(67, 3, 4, 2, 0, 0, 0, 1),
    new NoteData(67, 3, 4, 3, 0, 0, 0, 1),
    new NoteData(68, 0, 4, 0, 0, 0, 0, 1),

    new NoteData(68, 0, 2, 1, 0, 0, 0, 0),
    new NoteData(68, 1, 2, 0, 0, 0, 0, 1),
    new NoteData(68, 1, 2, 1, 0, 0, 0, 0),
    new NoteData(68, 2, 2, 0, 0, 0, 0, 0),
    new NoteData(68, 2, 2, 1, 0, 0, 0, 0),

    new NoteData(68, 3, 2, 0, 0, 0, 0, 1),
    new NoteData(68, 3, 2, 1, 0, 0, 0, 0),

    new NoteData(69, 0, 2, 0, 0, 0, 0, 1),
    new NoteData(69, 0, 2, 1, 0, 0, 0, 0),
    new NoteData(69, 1, 2, 0, 0, 0, 0, 1),
    new NoteData(69, 1, 2, 1, 0, 0, 0, 0),
    new NoteData(69, 2, 2, 0, 0, 0, 0, 1),
    new NoteData(69, 2, 2, 1, 0, 0, 0, 0),

    new NoteData(69, 3, 2, 0, 3, 0, 0, 1),
    new NoteData(69, 3, 2, 1, 3, 0, 0, 1),
    new NoteData(70, 0, 2, 0, 3, 0, 0, 1),
    new NoteData(70, 0, 2, 1, 3, 0, 0, 1),

    new NoteData(70, 1, 2, 0, 3, 0, 0, 0),
    new NoteData(70, 1, 2, 1, 3, 0, 0, 0),
    new NoteData(70, 2, 2, 0, 3, 0, 0, 0),
    new NoteData(70, 2, 2, 1, 3, 0, 0, 0),

    new NoteData(70, 3, 2, 0, 0, 0, 0, 1),
    new NoteData(71, 0, 2, 0, 0, 0, 0, 1),
    new NoteData(71, 1, 2, 0, 0, 0, 0, 1),
    new NoteData(71, 2, 2, 0, 0, 0, 0, 1),
    new NoteData(71, 3, 2, 0, 1, 1, 1, 1),
    new NoteData(72, 0, 2, 0, 3, 0, 0, 0),

    // Triple
    new NoteData(72, 0, 4, 2, 0, 0, 0, 0),
    new NoteData(72, 0, 4, 3, 0, 0, 0, 0),
    new NoteData(72, 1, 4, 0, 0, 0, 0, 0),

    new NoteData(72, 1, 4, 2, 0, 0, 0, 1),
    new NoteData(72, 2, 4, 2, 0, 0, 0, 1),
    new NoteData(72, 3, 4, 2, 3, 0, 0, 0),
    new NoteData(73, 0, 4, 0, 3, 0, 0, 0),

    new NoteData(73, 0, 4, 2, 0, 0, 0, 1),
    new NoteData(73, 0, 4, 3, 0, 0, 0, 1),
    new NoteData(73, 1, 4, 0, 0, 0, 0, 1),

    new NoteData(73, 1, 4, 2, 0, 0, 0, 0),
    new NoteData(73, 2, 4, 2, 0, 0, 0, 0),
    new NoteData(73, 3, 4, 2, 3, 0, 0, 1),
    new NoteData(74, 0, 4, 0, 3, 0, 0, 1),

    new NoteData(74, 0, 4, 2, 0, 0, 0, 0),
    new NoteData(74, 0, 4, 3, 0, 0, 0, 0),
    new NoteData(74, 1, 4, 0, 0, 0, 0, 0),

    new NoteData(74, 1, 4, 2, 0, 0, 0, 1),
    new NoteData(74, 2, 4, 2, 0, 0, 0, 1),
    new NoteData(74, 3, 4, 2, 3, 0, 0, 0),
    new NoteData(75, 0, 4, 0, 3, 0, 0, 0),

    new NoteData(75, 0, 4, 2, 0, 0, 0, 1),
    new NoteData(75, 0, 4, 3, 0, 0, 0, 1),
    new NoteData(75, 1, 4, 0, 0, 0, 0, 1),
    new NoteData(75, 1, 2, 1, 0, 0, 0, 1),
    new NoteData(75, 2, 2, 0, 0, 0, 0, 1),
    new NoteData(75, 2, 2, 1, 0, 0, 0, 1),
    new NoteData(75, 3, 1, 0, 1, 1, 1, 1),
    new NoteData(76, 0, 4, 0, 3, 0, 0, 0),

    new NoteData(76, 0, 4, 2, 0, 0, 0, 1),
    new NoteData(76, 0, 4, 3, 0, 0, 0, 1),
    new NoteData(76, 1, 4, 0, 0, 0, 0, 1),

    new NoteData(76, 1, 4, 2, 0, 0, 0, 0),
    new NoteData(76, 2, 4, 2, 0, 0, 0, 0),
    new NoteData(76, 3, 4, 2, 3, 0, 0, 1),
    new NoteData(77, 0, 4, 0, 3, 0, 0, 1),

    new NoteData(77, 0, 4, 2, 0, 0, 0, 0),
    new NoteData(77, 0, 4, 3, 0, 0, 0, 0),
    new NoteData(77, 1, 4, 0, 0, 0, 0, 0),

    new NoteData(77, 1, 4, 2, 0, 0, 0, 1),
    new NoteData(77, 2, 4, 2, 0, 0, 0, 0),
    new NoteData(77, 3, 2, 0, 0, 0, 0, 0),
    new NoteData(77, 3, 2, 1, 0, 0, 0, 0),
    new NoteData(78, 0, 2, 0, 0, 0, 0, 0),

    new NoteData(78, 0, 4, 2, 0, 0, 0, 0),
    new NoteData(78, 0, 4, 3, 0, 0, 0, 0),
    new NoteData(78, 1, 4, 0, 0, 0, 0, 0),

    new NoteData(78, 1, 4, 2, 0, 0, 0, 1),
    new NoteData(78, 2, 4, 0, 0, 0, 0, 1),

    new NoteData(78, 2, 4, 2, 0, 0, 0, 0),
    new NoteData(78, 2, 4, 3, 0, 0, 0, 0),
    new NoteData(78, 3, 4, 0, 0, 0, 0, 0),

    new NoteData(78, 3, 4, 2, 0, 0, 0, 1),
    new NoteData(79, 0, 4, 0, 0, 0, 0, 1),

    new NoteData(79, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(79, 2, 1, 0, 0, 0, 0, 1),
    new NoteData(79, 3, 1, 0, 0, 0, 0, 0),
    new NoteData(80, 0, 1, 0, 3, 0, 0, 1),

    new NoteData(80, 1, 2, 1, 0, 0, 0, 0),
    new NoteData(80, 3, 2, 0, 0, 0, 0, 0),
    new NoteData(80, 3, 2, 1, 0, 0, 0, 0),
    new NoteData(81, 0, 2, 0, 0, 0, 0, 0),

    new NoteData(81, 1, 2, 1, 0, 0, 0, 1),
    new NoteData(81, 3, 1, 0, 1, 1, 1, 1),
    new NoteData(82, 0, 1, 0, 3, 0, 0, 0),
    new NoteData(82, 1, 1, 0, 3, 0, 0, 0),

    new NoteData(82, 3, 2, 1, 0, 0, 0, 0),
    new NoteData(83, 0, 1, 0, 3, 0, 0, 1),
    new NoteData(83, 1, 1, 0, 3, 0, 0, 1),

    // Triple
    new NoteData(83, 1, 4, 2, 0, 0, 0, 0),
    new NoteData(83, 1, 4, 3, 0, 0, 0, 0),
    new NoteData(83, 2, 4, 0, 0, 0, 0, 0),

    new NoteData(83, 2, 2, 1, 0, 0, 0, 1),
    new NoteData(83, 3, 2, 0, 0, 0, 0, 0),
    new NoteData(83, 3, 2, 1, 0, 0, 0, 0),
    new NoteData(84, 0, 2, 0, 0, 0, 0, 1),

    new NoteData(84, 0, 4, 2, 0, 0, 0, 0),
    new NoteData(84, 0, 4, 3, 0, 0, 0, 0),
    new NoteData(84, 1, 4, 0, 0, 0, 0, 0),

    new NoteData(84, 1, 4, 2, 0, 0, 0, 1),
    new NoteData(84, 2, 4, 2, 0, 0, 0, 1),
    new NoteData(84, 3, 4, 2, 3, 0, 0, 0),
    new NoteData(85, 0, 4, 0, 3, 0, 0, 0),

    new NoteData(85, 0, 4, 2, 0, 0, 0, 1),
    new NoteData(85, 0, 4, 3, 0, 0, 0, 1),
    new NoteData(85, 1, 4, 0, 0, 0, 0, 1),

    new NoteData(85, 1, 2, 1, 0, 0, 0, 1),

    new NoteData(85, 2, 4, 0, 0, 0, 0, 0),
    new NoteData(85, 2, 4, 1, 0, 0, 0, 0),
    new NoteData(85, 2, 4, 2, 0, 0, 0, 0),
    new NoteData(85, 2, 4, 3, 0, 0, 0, 0),
    new NoteData(85, 3, 4, 0, 0, 0, 0, 0),

    // Triple x2
    new NoteData(85, 3, 4, 2, 0, 0, 0, 1),
    new NoteData(85, 3, 4, 3, 0, 0, 0, 1),
    new NoteData(86, 0, 4, 0, 0, 0, 0, 1),

    new NoteData(86, 0, 4, 2, 0, 0, 0, 0),
    new NoteData(86, 0, 4, 3, 0, 0, 0, 0),
    new NoteData(86, 1, 4, 0, 0, 0, 0, 0),

    new NoteData(86, 1, 2, 1, 3, 0, 0, 0),
    new NoteData(86, 2, 2, 1, 3, 0, 0, 0),
    new NoteData(86, 3, 2, 1, 3, 0, 0, 0),

    new NoteData(87, 0, 2, 0, 0, 0, 0, 1),
    new NoteData(87, 1, 2, 0, 0, 0, 0, 1),
    new NoteData(87, 2, 2, 0, 0, 0, 0, 1),
    new NoteData(87, 3, 2, 0, 0, 0, 0, 1),

    new NoteData(88, 0, 2, 0, 0, 0, 0, 0),
    new NoteData(88, 1, 2, 0, 0, 0, 0, 0),
    new NoteData(88, 2, 2, 0, 0, 0, 0, 0),
    new NoteData(88, 3, 2, 0, 0, 0, 0, 0),

    new NoteData(89, 0, 2, 0, 0, 0, 0, 1),
    new NoteData(89, 1, 2, 0, 0, 0, 0, 1),
    new NoteData(89, 2, 2, 0, 0, 0, 0, 1),
    new NoteData(89, 3, 2, 0, 0, 0, 0, 1),

    // No hit
    new NoteData(90, 0, 2, 0, 2, 0, 0, 0),
    new NoteData(90, 1, 2, 0, 2, 0, 0, 0),
    new NoteData(90, 2, 2, 0, 2, 0, 0, 0),
    new NoteData(90, 3, 2, 0, 2, 0, 0, 0),

    new NoteData(91, 1, 2, 0, 2, 0, 0, 1),
    new NoteData(91, 2, 2, 0, 2, 0, 0, 1),
    new NoteData(91, 3, 2, 0, 2, 0, 0, 1),
    new NoteData(92, 0, 2, 0, 2, 0, 0, 1),
    new NoteData(92, 1, 2, 0, 2, 0, 0, 1),

    new NoteData(92, 3, 2, 0, 2, 0, 0, 0),
    new NoteData(92, 3, 2, 1, 2, 0, 0, 0),
    new NoteData(93, 0, 2, 0, 2, 0, 0, 0),

    new NoteData(93, 1, 2, 0, 2, 0, 0, 1),
    new NoteData(93, 2, 2, 0, 2, 0, 0, 1),
    new NoteData(93, 3, 2, 0, 2, 0, 0, 1),

    new NoteData(94, 0, 2, 1, 2, 0, 0, 0),
    new NoteData(94, 1, 2, 1, 2, 0, 0, 0),
    new NoteData(94, 2, 2, 0, 2, 0, 0, 0),

    new NoteData(95, 0, 2, 0, 2, 0, 0, 1),
    new NoteData(95, 1, 2, 1, 2, 0, 0, 1),
    new NoteData(95, 3, 2, 0, 2, 0, 0, 1),

    new NoteData(99, 0, 1, 0, 3, 0, 0, 0),
];

const NiniEasyMap = [
    new NoteData(0, 0, 1, 0, 3, 0, 0, 0),
    new NoteData(1, 0, 1, 0, 0, 0, 0, 1),
    new NoteData(2, 0, 1, 0, 0, 0, 0, 0),

    new NoteData(3, 0, 1, 0, 0, 0, 0, 1),
    new NoteData(3, 2, 1, 0, 0, 0, 0, 1),

    new NoteData(4, 0, 1, 0, 0, 0, 0, 0),
    new NoteData(4, 2, 1, 0, 0, 0, 0, 0),

    new NoteData(5, 0, 1, 0, 0, 0, 0, 1),
    new NoteData(5, 2, 1, 0, 0, 0, 0, 1),

    new NoteData(6, 0, 1, 0, 0, 0, 0, 0),
    new NoteData(6, 2, 1, 0, 0, 0, 0, 0),
    new NoteData(7, 0, 1, 0, 0, 0, 0, 1),

    new NoteData(8, 0, 1, 0, 0, 0, 0, 0),
    new NoteData(8, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(8, 2, 1, 0, 0, 0, 0, 0),

    new NoteData(9, 0, 1, 0, 0, 0, 0, 1),
    new NoteData(9, 1, 1, 0, 0, 0, 0, 1),
    new NoteData(9, 2, 1, 0, 0, 0, 0, 1),

    new NoteData(10, 0, 1, 0, 0, 0, 0, 0),
    new NoteData(10, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(10, 2, 1, 0, 0, 0, 0, 0),

    new NoteData(11, 0, 1, 0, 0, 0, 0, 1),
    new NoteData(11, 1, 1, 0, 0, 0, 0, 1),
    new NoteData(11, 2, 1, 0, 0, 0, 0, 1),

    new NoteData(12, 0, 1, 0, 1, 1, 2, 0),
    new NoteData(13, 0, 1, 0, 1, 1, 2, 1),

    new NoteData(14, 0, 1, 0, 0, 0, 0, 0),
    new NoteData(14, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(14, 2, 1, 0, 0, 0, 0, 0),
    new NoteData(14, 3, 1, 0, 0, 0, 0, 0),
    new NoteData(15, 0, 1, 0, 0, 0, 0, 0),

    new NoteData(15, 2, 1, 0, 3, 0, 0, 1),
    new NoteData(16, 0, 1, 0, 0, 0, 0, 0),

    new NoteData(17, 0, 1, 0, 2, 0, 0, 0),
    new NoteData(18, 0, 1, 0, 2, 0, 0, 1),
    new NoteData(19, 0, 1, 0, 2, 0, 0, 0),

    new NoteData(19, 3, 1, 0, 3, 0, 0, 1),
    new NoteData(20, 0, 1, 0, 3, 0, 0, 1),

    new NoteData(21, 0, 1, 0, 2, 0, 0, 0),
    new NoteData(22, 0, 1, 0, 2, 0, 0, 1),
    new NoteData(23, 0, 1, 0, 2, 0, 0, 0),

    new NoteData(23, 2, 1, 0, 1, 1, 2, 1),
    new NoteData(24, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(24, 2, 2, 0, 0, 0, 0, 0),
    new NoteData(24, 2, 2, 1, 0, 0, 0, 0),
    new NoteData(24, 3, 2, 0, 0, 0, 0, 0),

    new NoteData(25, 0, 1, 0, 0, 0, 0, 1),
    new NoteData(25, 1, 1, 0, 0, 0, 0, 1),
    new NoteData(25, 2, 1, 0, 1, 1, 1, 1),

    new NoteData(26, 0, 1, 0, 0, 0, 0, 0),
    new NoteData(26, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(26, 2, 2, 0, 0, 0, 0, 0),
    new NoteData(26, 2, 2, 1, 0, 0, 0, 0),
    new NoteData(26, 3, 2, 0, 0, 0, 0, 0),

    new NoteData(27, 0, 1, 0, 0, 0, 0, 1),
    new NoteData(27, 1, 1, 0, 0, 0, 0, 1),
    new NoteData(27, 2, 1, 0, 3, 0, 0, 1),

    new NoteData(28, 0, 1, 0, 0, 0, 0, 1),
    new NoteData(28, 1, 1, 0, 0, 0, 0, 1),
    new NoteData(28, 2, 2, 0, 0, 0, 0, 1),
    new NoteData(28, 2, 2, 1, 0, 0, 0, 1),
    new NoteData(28, 3, 2, 0, 0, 0, 0, 1),

    new NoteData(29, 0, 1, 0, 0, 0, 0, 0),
    new NoteData(29, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(29, 2, 1, 0, 1, 1, 1, 0),

    new NoteData(30, 0, 1, 0, 0, 0, 0, 1),
    new NoteData(30, 1, 1, 0, 0, 0, 0, 1),
    new NoteData(30, 2, 2, 0, 0, 0, 0, 1),
    new NoteData(30, 2, 2, 1, 0, 0, 0, 1),
    new NoteData(30, 3, 2, 0, 0, 0, 0, 1),

    new NoteData(31, 0, 1, 0, 0, 0, 0, 0),
    new NoteData(31, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(31, 2, 1, 0, 3, 0, 0, 0),

    new NoteData(32, 0, 1, 0, 0, 0, 0, 1),
    new NoteData(32, 1, 1, 0, 0, 0, 0, 1),
    new NoteData(32, 2, 2, 0, 0, 0, 0, 1),
    new NoteData(32, 2, 2, 1, 0, 0, 0, 1),
    new NoteData(32, 3, 2, 0, 0, 0, 0, 1),

    new NoteData(33, 0, 1, 0, 0, 0, 0, 0),
    new NoteData(33, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(33, 2, 1, 0, 1, 1, 1, 0),

    new NoteData(34, 0, 1, 0, 0, 0, 0, 1),
    new NoteData(34, 1, 1, 0, 0, 0, 0, 1),
    new NoteData(34, 2, 2, 0, 0, 0, 0, 1),
    new NoteData(34, 2, 2, 1, 0, 0, 0, 1),
    new NoteData(34, 3, 2, 0, 0, 0, 0, 1),

    new NoteData(35, 0, 1, 0, 0, 0, 0, 0),
    new NoteData(35, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(35, 2, 1, 0, 3, 0, 0, 0),

    new NoteData(36, 0, 1, 0, 0, 0, 0, 1),
    new NoteData(36, 1, 1, 0, 0, 0, 0, 1),
    new NoteData(36, 2, 2, 0, 0, 0, 0, 1),
    new NoteData(36, 2, 2, 1, 0, 0, 0, 1),
    new NoteData(36, 3, 1, 0, 0, 0, 0, 1),

    new NoteData(37, 0, 1, 0, 0, 0, 0, 0),
    new NoteData(37, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(37, 2, 1, 0, 1, 1, 1, 0),

    new NoteData(38, 0, 1, 0, 0, 0, 0, 1),
    new NoteData(38, 1, 1, 0, 0, 0, 0, 1),
    new NoteData(38, 2, 2, 0, 0, 0, 0, 1),
    new NoteData(38, 2, 2, 1, 0, 0, 0, 1),
    new NoteData(38, 3, 1, 0, 0, 0, 0, 1),

    new NoteData(39, 0, 2, 0, 0, 0, 0, 0),
    new NoteData(39, 0, 2, 1, 0, 0, 0, 0),
    new NoteData(39, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(39, 2, 1, 0, 1, 1, 2, 1),

    new NoteData(40, 2, 1, 0, 2, 0, 0, 0),
    new NoteData(41, 0, 1, 0, 2, 0, 0, 0),
    new NoteData(41, 2, 1, 0, 2, 0, 0, 1),
    new NoteData(42, 0, 1, 0, 2, 0, 0, 1),

    new NoteData(42, 3, 1, 0, 2, 0, 0, 0),
    new NoteData(43, 0, 1, 0, 2, 0, 0, 0),

    new NoteData(44, 0, 1, 0, 2, 0, 0, 1),
    new NoteData(44, 2, 1, 0, 2, 0, 0, 1),
    new NoteData(45, 0, 1, 0, 2, 0, 0, 0),
    new NoteData(45, 2, 1, 0, 2, 0, 0, 0),

    new NoteData(46, 0, 1, 0, 1, 1, 4, 1),
    new NoteData(47, 1, 1, 0, 2, 0, 0, 1),
    new NoteData(47, 2, 1, 0, 2, 0, 0, 0),
    new NoteData(47, 3, 1, 0, 2, 0, 0, 0),
    new NoteData(48, 0, 1, 0, 3, 0, 0, 0),

    new NoteData(48, 1, 2, 1, 2, 0, 0, 1),
    new NoteData(48, 3, 2, 1, 0, 0, 0, 0),
    new NoteData(49, 1, 2, 1, 2, 0, 0, 1),

    new NoteData(49, 3, 2, 1, 3, 0, 0, 0),
    new NoteData(50, 0, 1, 0, 3, 0, 0, 0),

    new NoteData(50, 1, 2, 1, 2, 0, 0, 1),
    new NoteData(50, 3, 2, 1, 0, 0, 0, 0),
    new NoteData(51, 1, 2, 1, 2, 0, 0, 1),

    new NoteData(51, 3, 1, 0, 3, 0, 0, 0),
    new NoteData(52, 0, 1, 0, 1, 1, 3, 1),
    new NoteData(53, 0, 1, 0, 1, 1, 3, 0),

    new NoteData(54, 0, 1, 0, 0, 0, 0, 1),
    new NoteData(54, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(54, 2, 1, 0, 0, 0, 0, 1),
    new NoteData(54, 3, 1, 0, 0, 0, 0, 0),
    new NoteData(55, 0, 1, 0, 2, 0, 0, 1),

    //Hype
    new NoteData(56, 0, 1, 0, 0, 0, 0, 0),
    new NoteData(56, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(56, 2, 1, 0, 0, 0, 0, 0),
    new NoteData(56, 3, 1, 0, 0, 0, 0, 0),

    new NoteData(57, 0, 1, 0, 0, 0, 0, 1),
    new NoteData(57, 1, 1, 0, 0, 0, 0, 1),
    new NoteData(57, 2, 1, 0, 0, 0, 0, 1),
    new NoteData(57, 3, 1, 0, 0, 0, 0, 1),

    new NoteData(58, 0, 1, 0, 0, 0, 0, 0),
    new NoteData(58, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(58, 2, 1, 0, 0, 0, 0, 1),
    new NoteData(58, 3, 1, 0, 0, 0, 0, 1),

    new NoteData(59, 0, 1, 0, 0, 0, 0, 0),
    new NoteData(59, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(59, 2, 1, 0, 0, 0, 0, 1),
    new NoteData(59, 3, 1, 0, 0, 0, 0, 1),

    new NoteData(60, 0, 1, 0, 0, 0, 0, 0),
    new NoteData(60, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(60, 2, 2, 0, 0, 0, 0, 0),
    new NoteData(60, 2, 2, 1, 0, 0, 0, 0),
    new NoteData(60, 3, 1, 0, 0, 0, 0, 0),

    new NoteData(61, 0, 1, 0, 0, 0, 0, 1),
    new NoteData(61, 1, 1, 0, 0, 0, 0, 1),
    new NoteData(61, 2, 2, 0, 0, 0, 0, 1),
    new NoteData(61, 2, 2, 1, 0, 0, 0, 1),
    new NoteData(61, 3, 1, 0, 0, 0, 0, 1),

    new NoteData(62, 0, 1, 0, 0, 0, 0, 0),
    new NoteData(62, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(62, 2, 2, 0, 0, 0, 0, 0),
    new NoteData(62, 2, 2, 1, 0, 0, 0, 0),
    new NoteData(62, 3, 1, 0, 0, 0, 0, 0),
    new NoteData(63, 0, 1, 0, 3, 0, 0, 1),
    new NoteData(63, 2, 1, 0, 0, 0, 0, 0),
    new NoteData(63, 3, 1, 0, 3, 0, 0, 0),

    new NoteData(64, 0, 1, 0, 0, 0, 0, 1),
    new NoteData(64, 1, 1, 0, 0, 0, 0, 1),
    new NoteData(64, 2, 1, 0, 0, 0, 0, 1),
    new NoteData(64, 3, 1, 0, 0, 0, 0, 1),

    new NoteData(65, 0, 1, 0, 0, 0, 0, 0),
    new NoteData(65, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(65, 2, 1, 0, 0, 0, 0, 0),
    new NoteData(65, 3, 1, 0, 0, 0, 0, 0),

    new NoteData(66, 0, 1, 0, 0, 0, 0, 0),
    new NoteData(66, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(66, 2, 1, 0, 0, 0, 0, 1),
    new NoteData(66, 3, 1, 0, 0, 0, 0, 1),

    new NoteData(67, 0, 1, 0, 0, 0, 0, 0),
    new NoteData(67, 1, 1, 0, 0, 0, 0, 0),
    new NoteData(67, 2, 1, 0, 0, 0, 0, 1),
    new NoteData(67, 3, 1, 0, 0, 0, 0, 1),

    new NoteData(68, 0, 1, 0, 0, 0, 0, 0),
    new NoteData(68, 1, 1, 0, 3, 0, 0, 1),
    new NoteData(68, 2, 1, 0, 0, 0, 0, 0),
    new NoteData(68, 3, 1, 0, 3, 0, 0, 1),
    new NoteData(69, 0, 1, 0, 0, 0, 0, 0),
    new NoteData(69, 1, 1, 0, 3, 0, 0, 1),
    new NoteData(69, 2, 1, 0, 0, 0, 0, 0),
    new NoteData(69, 3, 1, 0, 3, 0, 0, 1),

    new NoteData(70, 0, 1, 0, 1, 1, 3, 0),
    new NoteData(70, 3, 1, 0, 0, 0, 0, 1),
    new NoteData(71, 0, 1, 0, 0, 0, 0, 1),
    new NoteData(71, 1, 1, 0, 0, 0, 0, 1),
    new NoteData(71, 2, 1, 0, 0, 0, 0, 1),

    new NoteData(72, 0, 1, 0, 0, 0, 0, 0),
    new NoteData(72, 1, 2, 0, 0, 0, 0, 0),
    new NoteData(72, 1, 2, 1, 0, 0, 0, 0),
    new NoteData(72, 2, 2, 1, 0, 0, 0, 0),

    new NoteData(72, 3, 2, 1, 0, 0, 0, 1),
    new NoteData(73, 0, 2, 0, 0, 0, 0, 1),
    new NoteData(73, 1, 2, 0, 0, 0, 0, 1),
    new NoteData(73, 1, 2, 1, 0, 0, 0, 1),
    new NoteData(73, 2, 2, 1, 0, 0, 0, 1),

    new NoteData(73, 3, 2, 1, 0, 0, 0, 0),
    new NoteData(74, 0, 2, 0, 0, 0, 0, 0),
    new NoteData(74, 1, 2, 0, 0, 0, 0, 0),
    new NoteData(74, 1, 2, 1, 0, 0, 0, 0),
    new NoteData(74, 2, 2, 1, 0, 0, 0, 0),
    new NoteData(74, 3, 2, 1, 3, 0, 0, 1),

    new NoteData(75, 0, 2, 1, 2, 0, 0, 0),
    new NoteData(75, 1, 2, 0, 2, 0, 0, 0),
    new NoteData(75, 1, 2, 1, 2, 0, 0, 0),
    new NoteData(75, 2, 2, 0, 2, 0, 0, 1),
    new NoteData(75, 3, 2, 0, 2, 0, 0, 1),

    new NoteData(76, 0, 1, 0, 0, 0, 0, 0),
    new NoteData(76, 1, 2, 0, 0, 0, 0, 0),
    new NoteData(76, 1, 2, 1, 0, 0, 0, 0),
    new NoteData(76, 2, 2, 1, 0, 0, 0, 0),

    new NoteData(76, 3, 2, 1, 0, 0, 0, 1),
    new NoteData(77, 0, 2, 0, 0, 0, 0, 1),
    new NoteData(77, 1, 2, 0, 0, 0, 0, 1),
    new NoteData(77, 1, 2, 1, 0, 0, 0, 1),
    new NoteData(77, 2, 2, 1, 0, 0, 0, 1),

    new NoteData(77, 3, 2, 1, 0, 0, 0, 0),
    new NoteData(78, 0, 1, 0, 1, 1, 2, 0),
    new NoteData(78, 2, 1, 0, 1, 1, 2, 1),
    new NoteData(79, 0, 1, 0, 3, 0, 0, 0),
    new NoteData(79, 1, 1, 0, 3, 0, 0, 0),
    new NoteData(79, 2, 1, 0, 3, 0, 0, 0),

    new NoteData(80, 0, 1, 0, 3, 0, 0, 0),
    new NoteData(80, 2, 1, 0, 2, 0, 0, 1),
    new NoteData(81, 0, 1, 0, 2, 0, 0, 0),
    new NoteData(81, 2, 1, 0, 2, 0, 0, 1),

    new NoteData(82, 0, 1, 0, 3, 0, 0, 0),
    new NoteData(82, 1, 1, 0, 3, 0, 0, 0),

    new NoteData(83, 0, 1, 0, 3, 0, 0, 1),
    new NoteData(83, 1, 1, 0, 3, 0, 0, 1),

    new NoteData(84, 0, 1, 0, 0, 0, 0, 0),
    new NoteData(84, 1, 2, 0, 0, 0, 0, 0),
    new NoteData(84, 1, 2, 1, 0, 0, 0, 0),
    new NoteData(84, 2, 2, 1, 0, 0, 0, 0),    

    new NoteData(84, 3, 2, 1, 0, 0, 0, 1),
    new NoteData(85, 0, 2, 0, 0, 0, 0, 1),
    new NoteData(85, 1, 2, 0, 0, 0, 0, 1),
    new NoteData(85, 1, 2, 1, 0, 0, 0, 1),
    new NoteData(85, 2, 2, 1, 0, 0, 0, 1),

    new NoteData(85, 3, 2, 1, 0, 0, 0, 0),
    new NoteData(86, 0, 2, 0, 0, 0, 0, 0),
    new NoteData(86, 1, 2, 0, 0, 0, 0, 0),
    new NoteData(86, 1, 2, 1, 0, 0, 0, 0),
    new NoteData(86, 2, 2, 1, 3, 0, 0, 0),
    new NoteData(86, 3, 2, 1, 3, 0, 0, 0),

    new NoteData(87, 0, 1, 0, 0, 0, 0, 1),
    new NoteData(87, 1, 1, 0, 0, 0, 0, 1),
    new NoteData(87, 2, 1, 0, 0, 0, 0, 1),
    new NoteData(87, 3, 1, 0, 0, 0, 0, 1),

    new NoteData(88, 0, 1, 0, 1, 1, 3, 0),
    new NoteData(89, 0, 1, 0, 1, 1, 3, 1),

    // No hit
    new NoteData(90, 0, 2, 0, 2, 0, 0, 0),
    new NoteData(90, 1, 2, 0, 2, 0, 0, 0),
    new NoteData(90, 2, 2, 0, 2, 0, 0, 0),
    new NoteData(90, 3, 2, 0, 2, 0, 0, 0),

    new NoteData(91, 1, 2, 0, 2, 0, 0, 1),
    new NoteData(91, 2, 2, 0, 2, 0, 0, 1),
    new NoteData(91, 3, 2, 0, 2, 0, 0, 1),
    new NoteData(92, 0, 2, 0, 2, 0, 0, 1),
    new NoteData(92, 1, 2, 0, 2, 0, 0, 1),

    new NoteData(92, 3, 2, 0, 2, 0, 0, 0),
    new NoteData(92, 3, 2, 1, 2, 0, 0, 0),
    new NoteData(93, 0, 2, 0, 2, 0, 0, 0),

    new NoteData(93, 1, 2, 0, 2, 0, 0, 1),
    new NoteData(93, 2, 2, 0, 2, 0, 0, 1),
    new NoteData(93, 3, 2, 0, 2, 0, 0, 1),

    new NoteData(94, 0, 2, 1, 2, 0, 0, 0),
    new NoteData(94, 1, 2, 1, 2, 0, 0, 0),
    new NoteData(94, 2, 2, 0, 2, 0, 0, 0),

    new NoteData(95, 0, 2, 0, 2, 0, 0, 1),
    new NoteData(95, 1, 2, 1, 2, 0, 0, 1),
    new NoteData(95, 3, 2, 0, 2, 0, 0, 1),

    new NoteData(99, 0, 1, 0, 3, 0, 0, 0),
];

const CyaeghaHardMap = [
    new NoteData(0, 0, 1, 0, 0, 0, 0, 1),

    new NoteData(0, 3, 1, 0, 0, 0, 0, 1),
    new NoteData(1, 0, 1, 0, 0, 0, 0, 1),

    new NoteData(1, 3, 1, 0, 0, 0, 0, 1),
    new NoteData(2, 0, 1, 0, 0, 0, 0, 1),

    new NoteData(2, 3, 1, 0, 0, 0, 0, 1),
    new NoteData(3, 0, 1, 0, 0, 0, 0, 1),

    new NoteData(3, 3, 1, 0, 0, 0, 0, 1),
    new NoteData(4, 0, 1, 0, 3, 0, 0, 1),

    new NoteData(4, 2, 1, 0, 0, 0, 0, 0),
    new NoteData(4, 3, 1, 0, 0, 0, 0, 1),
    new NoteData(5, 0, 1, 0, 0, 0, 0, 1),

    new NoteData(5, 2, 1, 0, 0, 0, 0, 0),
    new NoteData(5, 3, 1, 0, 0, 0, 0, 1),
    new NoteData(6, 0, 1, 0, 0, 0, 0, 1),

    new NoteData(6, 2, 1, 0, 0, 0, 0, 0),
    new NoteData(6, 3, 1, 0, 0, 0, 0, 1),
    new NoteData(7, 0, 1, 0, 1, 1, 3, 1),

    new NoteData(8, 0, 1, 0, 3, 0, 0, 1),

    new NoteData(8, 1, 2, 1, 0, 0, 0, 0),
    new NoteData(8, 2, 4, 0, 0, 0, 0, 0),
    new NoteData(8, 2, 4, 1, 0, 0, 0, 0),
    new NoteData(8, 2, 4, 2, 0, 0, 0, 0),
    new NoteData(8, 3, 2, 0, 0, 0, 0, 1),
    new NoteData(8, 3, 2, 1, 0, 0, 0, 1),
    new NoteData(9, 0, 2, 0, 3, 0, 0, 0),

    new NoteData(9, 1, 2, 1, 0, 0, 0, 1),
    new NoteData(9, 2, 4, 0, 0, 0, 0, 1),
    new NoteData(9, 2, 4, 1, 0, 0, 0, 1),
    new NoteData(9, 2, 4, 2, 0, 0, 0, 1),
    new NoteData(9, 3, 2, 0, 0, 0, 0, 0),
    new NoteData(9, 3, 2, 1, 0, 0, 0, 0),
    new NoteData(10, 0, 2, 0, 3, 0, 0, 1),

    new NoteData(10, 1, 2, 1, 0, 0, 0, 0),
    new NoteData(10, 2, 4, 0, 0, 0, 0, 0),
    new NoteData(10, 2, 4, 1, 0, 0, 0, 0),
    new NoteData(10, 2, 4, 2, 0, 0, 0, 0),
    new NoteData(10, 3, 2, 0, 0, 0, 0, 1),
    new NoteData(10, 3, 2, 1, 0, 0, 0, 1),

    new NoteData(11, 0, 2, 0, 1, 1, 2, 0),
    new NoteData(11, 2, 2, 0, 0, 0, 0, 1),
    new NoteData(11, 3, 2, 0, 0, 0, 0, 1),

    new NoteData(12, 0, 2, 0, 0, 0, 0, 0),
    new NoteData(12, 0, 2, 1, 0, 0, 0, 0),
    new NoteData(12, 1, 2, 0, 0, 0, 0, 0),
    new NoteData(12, 1, 2, 1, 0, 0, 0, 0),
    new NoteData(12, 2, 2, 0, 0, 0, 0, 0),
    new NoteData(12, 2, 2, 1, 0, 0, 0, 0),
    new NoteData(12, 3, 2, 0, 0, 0, 0, 0),
    new NoteData(12, 3, 2, 1, 0, 0, 0, 0),

    new NoteData(13, 0, 2, 0, 0, 0, 0, 0),
    new NoteData(13, 0, 2, 1, 0, 0, 0, 0),
    new NoteData(13, 1, 2, 0, 0, 0, 0, 0),
    new NoteData(13, 1, 2, 1, 0, 0, 0, 0),
    new NoteData(13, 2, 2, 0, 0, 0, 0, 0),
    new NoteData(13, 2, 2, 1, 0, 0, 0, 0),
    new NoteData(13, 3, 2, 0, 0, 0, 0, 0),
    new NoteData(13, 3, 2, 1, 0, 0, 0, 0),

    new NoteData(14, 0, 2, 0, 0, 0, 0, 1),
    new NoteData(14, 0, 2, 1, 0, 0, 0, 1),
    new NoteData(14, 1, 2, 0, 0, 0, 0, 1),
    new NoteData(14, 1, 2, 1, 0, 0, 0, 1),

    new NoteData(14, 2, 4, 0, 0, 0, 0, 0),
    new NoteData(14, 2, 4, 1, 0, 0, 0, 0),
    new NoteData(14, 2, 4, 2, 0, 0, 0, 0),
    new NoteData(14, 2, 4, 3, 0, 0, 0, 0),
    new NoteData(14, 3, 4, 0, 0, 0, 0, 0),
    new NoteData(14, 3, 4, 1, 0, 0, 0, 0),
    new NoteData(14, 3, 4, 2, 0, 0, 0, 0),
    new NoteData(14, 3, 4, 3, 0, 0, 0, 0),
    new NoteData(15, 0, 1, 0, 3, 0, 0, 1),

    new NoteData(15, 1, 2, 0, 0, 0, 0, 1),
    new NoteData(15, 1, 2, 1, 0, 0, 0, 1),
    new NoteData(15, 2, 2, 0, 0, 0, 0, 0),
];


const CyaeghaEasyMap = [

];
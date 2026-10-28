// 1. Define your word pairs using a Map
const replacementMap = new Map([
  ["Man City", "Manchester City"],
  ["Man Utd", "Manchester United"],
  ["Man United", "Manchester United"],
  ["Manchester Utd", "Manchester United"],
  ["Brighton", "Brighton & Hove Albion"],
  ["Ipswich", "Ipswich Town"],
  ["Nottm Forest", "Nottingham Forest"],
  ["Leeds", "Leeds United"],
  ["Hull", "Hull City"],
  ["Wolves", "Wolverhampton Wanderers"],
  ["Wolverhampton", "Wolverhampton Wanderers"],
  ["Spurs", "Tottenham Hotspur"],
  ["Tottenham", "Tottenham Hotspur"],
  ["West Ham", "West Ham United"],
  ["West Ham Utd", "West Ham United"],
  ["Sheffield Utd", "Sheffield United"],
  ["Sheff Utd", "Sheffield United"],
  ["Newcastle", "Newcastle United"],
  ["Newcastle Utd", "Newcastle United"],
  ["Coventry", "Coventry City"],
  ["AFC Bournemouth", "Bournemouth"],
  ["Boro", "Middlesbrough"],
  ["Stoke", "Stoke City"],
  ["Sheffield Weds", "Sheffield Wednesday"],
  ["Sheff Wednesday", "Sheffield Wednesday"],
  ["Sheff Wed", "Sheffield Wednesday"],
  ["Wigan", "Wigan Athletic"],
  ["Cardiff", "Cardiff City"],
  ["Swansea", "Swansea City"],
  ["Derby", "Derby County"],
  ["Blackburn", "Blackburn Rovers"],
  ["Bolton", "Bolton Wanderers"],
  ["Charlton", "Charlton Athletic"],
  ["West Brom", "West Bromwich Albion"],
  ["West Bromwich", "West Bromwich Albion"],
  ["Preston", "Preston North End"],
  ["Birmingham", "Birmingham City"],
  ["Lincoln", "Lincoln City"],
  ["QPR", "Queens Park Rangers"],
  ["Norwich", "Norwich City"],
  ["Huddersfield", "Huddersfield Town"],
  ["Luton", "Luton Town"],
  ["Leicester", "Leicester City"],
  ["AFC Wimbledon", "Wimbledon"],
  ["Wycombe", "Wycombe Wanderers"],
  ["Mansfield", "Mansfield Town"],
  ["Peterborough", "Peterborough United"],
  ["Burton", "Burton Albion"],
  ["Cambridge", "Cambridge United"],
  ["Plymouth", "Plymouth Argyle"],
  ["Doncaster", "Doncaster Rovers"],
  ["Rotherham", "Rotherham United"],
  ["Oxford Utd", "Oxford United"],
  ["Oxford", "Oxford United"],
  ["Shrewsbury", "Shrewsbury Town"],
  ["Accrington", "Accrington Stanley"],
  ["Fleetwood", "Fleetwood Town"],
  ["MK Dons", "Milton Keynes Dons"],
  ["Swindon", "Swindon Town"],
  ["Cheltenham", "Cheltenham Town"],
  ["Newport", "Newport County"],
  ["Northampton", "Northampton Town"],
  ["Colchester", "Colchester United"],
  ["Oldham", "Oldham Athletic"],
  ["Crewe", "Crewe Alexandra"],
  ["Crawley", "Crawley Town"],
  ["Tranmere", "Tranmere Rovers"],
  ["Exeter", "Exeter City"],
  ["Grimsby", "Grimsby Town"],
  ["York", "York City"],
  ["Forest Green", "Forest Green Rovers"],
  ["Harrogate", "Harrogate Town"],
  ["AFC Fylde", "Fylde"],
  ["Scunthorpe", "Scunthorpe United"],
  ["Carlisle", "Carlisle United"],
  ["Southend", "Southend United"],
  ["FC Halifax Town", "Halifax Town"],
  ["Yeovil", "Yeovil Town"],
  ["AFC Telford United", "Telford United"],
  ["Spennymoor Town FC", "Spennymoor Town"],
  ["Chester FC", "Chester"],
  ["Chelmsford", "Chelmsford City"],
  ["Hemel Hempstead", "Hemel Hempstead Town"],
  ["Weston Super Mare", "Weston-super-Mare"],
  ["FC United of Manchester", "United of Manchester"],
  ["Gainsborough", "Gainsborough Trinity"],
  ["AFC Totton", "Totton"],
  ["Bradford", "Bradford City"],
  ["Basingstoke", "Basingstoke Town"],
  ["Worcester", "Worcester City"],
  ["Whitby", "Whitby Town"],
  ["Harborough Town FC", "Harborough Town"],
  ["Salford", "Salford City"],
  ["Gateshead FC", "Gateshead"],
  ["St Albans", "St Albans City"],
  ["Curzon", "Curzon Ashton"],
  ["Halesowen Town FC", "Halesowen Town"],
  ["Kettering Town FC", "Kettering Town"],
  ["Chichester City FC", "Chichester City"],
  ["Havant and Waterlooville", "Havant & Waterlooville"],
  ["Poole Town FC", "Poole Town"],
  ["Stamford AFC", "Stamford"],
  ["Dundee FC", "Dundee"],
  ["Hearts", "Heart of Midlothian"],
  ["Walton and Hersham", "Walton & Hersham"],
  ["Burnham FC", "Burnham"],
  ["Harrow", "Harrow Borough"],
  ["Nottingham", "Nottingham Forest"],
  ["Inter", "Inter Milan"],
  ["FC Porto", "Porto"],
  ["Hednesford", "Hednesford Town"],
  ["Macclesfield FC", "Macclesfield"],
  ["Feyenoord", "Feyenoord Rotterdam"],
  ["Sporting CP", "Sporting Lisbon"],
  ["Hampton & Richmond", "Hampton & Richmond Borough"],
  ["PSG", "Paris Saint-Germain"],
]);

const pattern = Array.from(replacementMap.keys())
  .map(word => word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'))
  .join('|');
const regex = new RegExp(`^(${pattern})$`, "gi");

// Turn the replacement logic into a reusable function
function replaceTextInNode(node) {
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
  let currentNode;
  while ((currentNode = walker.nextNode())) {
    if (currentNode.nodeValue.match(regex)) {
      currentNode.nodeValue = currentNode.nodeValue.replace(regex, (matched) => {
        for (let [key, value] of replacementMap) {
          if (key.toLowerCase() === matched.toLowerCase()) return value;
        }
        return matched;
      });
    }
  }
}

// 1. Run once on the initial page load
replaceTextInNode(document.body);

// 2. Watch the page for newly added elements and fix them instantly
const observer = new MutationObserver((mutations) => {
  for (let mutation of mutations) {
    for (let addedNode of mutation.addedNodes) {
      // Only scan elements that can actually contain text
      if (addedNode.nodeType === Node.ELEMENT_NODE) {
        replaceTextInNode(addedNode);
      }
    }
  }
});

// Start watching the entire document structure
observer.observe(document.body, { childList: true, subtree: true });
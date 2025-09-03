export const demoScenarios = [
  {
    id: 'electrical-outlets',
    title: 'Electrical Outlet Heights',
    description: 'Clarification on outlet mounting heights in conference rooms',
    projectName: 'Sunset Office Complex',
    rfiNumber: 'RFI-001',
    tradeName: 'Electrical',
    urgency: 'Medium' as const,
    keywords: ['outlet', 'electrical', 'height', 'conference', 'room'],
    analysis: {
      category: 'Clarification' as const,
      urgency: 'Medium' as const,
      affectedTrades: ['Electrical', 'Architectural'],
      responseStrategy: 'Provide direct answer with drawing references and ADA compliance requirements'
    },
    response: `RE: RFI-001 - Electrical Outlet Heights

Thank you for your inquiry regarding electrical outlet mounting heights in the conference rooms.

Per architectural drawings A-201 and electrical specifications Section 26 05 19, standard electrical outlets in conference rooms shall be mounted at 18" AFF (Above Finished Floor) unless otherwise noted.

For ADA compliance areas, outlets shall be mounted no lower than 15" AFF and no higher than 48" AFF as per Section 26 05 00.

Please coordinate with the architectural team for any special requirements in executive conference rooms, which may require outlets at table height (30" AFF).

Please proceed with installation per these specifications. If you encounter any conflicts with furniture plans, please submit a follow-up RFI with specific room numbers.

Best regards,
Project Management Team`,
    documentReferences: ['A-201 - Floor Plans', 'Section 26 05 19 - Electrical Outlets', 'Section 26 05 00 - ADA Compliance']
  },
  
  {
    id: 'door-hardware-conflict',
    title: 'Door Hardware Specification Conflict',
    description: 'Conflict between architectural drawings and security specifications',
    projectName: 'Metro Hospital',
    rfiNumber: 'RFI-045',
    tradeName: 'General Contractor',
    urgency: 'High' as const,
    keywords: ['door', 'hardware', 'conflict', 'security', 'keypad', 'lever'],
    analysis: {
      category: 'Conflict' as const,
      urgency: 'High' as const,
      affectedTrades: ['Architectural', 'Security', 'Hardware'],
      responseStrategy: 'Resolve specification conflict with clear priority and coordination requirements'
    },
    response: `RE: RFI-045 - Door Hardware Specification Conflict

Thank you for bringing this specification conflict to our attention.

After reviewing both the architectural drawings (A-301) and the security specifications (Section 08 71 00), please implement the following:

RESOLUTION: Install keypad locks as specified in Section 08 71 00 - Security Requirements. The lever handles shown on architectural drawings are superseded by security requirements for this project.

AFFECTED LOCATIONS: All main entry doors and security zones as identified in the security plan (S-001).

COORDINATION REQUIRED: Please coordinate with the security contractor (Johnson Controls) for programming requirements and master key schedules.

The architectural drawings will be updated in the next revision to reflect these security requirements.

Please proceed with keypad lock installation per security specifications.

Best regards,
Project Management Team`,
    documentReferences: ['A-301 - Door Schedules', 'Section 08 71 00 - Security Requirements', 'S-001 - Security Plan']
  },

  {
    id: 'hvac-routing',
    title: 'HVAC Ductwork Routing Conflict',
    description: 'Ductwork conflicts with structural beam locations',
    projectName: 'Downtown Retail Center',
    rfiNumber: 'RFI-023',
    tradeName: 'HVAC',
    urgency: 'Critical' as const,
    keywords: ['hvac', 'ductwork', 'beam', 'structural', 'conflict', 'routing'],
    analysis: {
      category: 'Conflict' as const,
      urgency: 'Critical' as const,
      affectedTrades: ['HVAC', 'Structural', 'Architectural'],
      responseStrategy: 'Coordinate immediate resolution meeting and provide alternative routing solution'
    },
    response: `RE: RFI-023 - HVAC Ductwork Routing Conflict

Thank you for identifying this critical conflict between the HVAC ductwork and structural beam locations.

IMMEDIATE ACTION REQUIRED: Stop work in affected areas until resolution is complete.

COORDINATION MEETING: A coordination meeting is scheduled for tomorrow at 10:00 AM with:
- Structural Engineer (Smith & Associates)
- HVAC Designer (Climate Solutions)
- Project Manager
- General Contractor

ALTERNATIVE ROUTING: Preliminary review suggests routing ductwork through the corridor ceiling space with minor modifications to diffuser locations. This will be confirmed during coordination meeting.

AFFECTED AREAS: Level 2 retail spaces, Zones A-C as shown on HVAC plan H-201.

NEXT STEPS:
1. Attend coordination meeting
2. Review alternative routing solution
3. Await revised drawings within 48 hours
4. Resume work with approved modifications

Please contact me immediately if you have questions or if this delay affects critical path activities.

Best regards,
Project Management Team`,
    documentReferences: ['H-201 - HVAC Plans', 'S-101 - Structural Plans', 'Coordination Meeting Minutes']
  },

  {
    id: 'concrete-mix-design',
    title: 'Concrete Mix Design Specification',
    description: 'Discrepancy between specifications and structural drawings',
    projectName: 'University Science Building',
    rfiNumber: 'RFI-088',
    tradeName: 'Concrete',
    urgency: 'High' as const,
    keywords: ['concrete', 'mix', 'design', '4000', '3500', 'psi', 'structural'],
    analysis: {
      category: 'Conflict' as const,
      urgency: 'High' as const,
      affectedTrades: ['Concrete', 'Structural'],
      responseStrategy: 'Provide authoritative answer based on structural engineering requirements'
    },
    response: `RE: RFI-088 - Concrete Mix Design Specification Discrepancy

Thank you for bringing this specification discrepancy to our attention.

RESOLUTION: Use 4000 PSI concrete mix as specified in Section 03 30 00 - Cast-in-Place Concrete.

ENGINEERING REVIEW: The structural engineer (Peterson Engineering) has confirmed that 4000 PSI is required for all structural elements per the structural calculations dated March 15, 2024.

CLARIFICATION: The 3500 PSI reference on drawing S-201 is an error from an early design revision. This will be corrected in the next drawing revision.

AFFECTED ELEMENTS: All foundations, columns, beams, and slabs as detailed in the structural drawings.

MIX DESIGN: Please submit your proposed 4000 PSI mix design to the structural engineer for approval before proceeding with any concrete placement.

DOCUMENTATION: Update your concrete placement records to reflect the correct 4000 PSI specification.

Please proceed with confidence using the 4000 PSI mix design. Contact the structural engineer directly at (555) 123-4567 for any technical questions.

Best regards,
Project Management Team`,
    documentReferences: ['Section 03 30 00 - Cast-in-Place Concrete', 'S-201 - Structural Plans', 'Structural Calculations 03/15/2024']
  },

  {
    id: 'waterproofing-details',
    title: 'Foundation Waterproofing Detail',
    description: 'Unclear waterproofing detail at utility penetrations',
    projectName: 'Riverside Apartments',
    rfiNumber: 'RFI-012',
    tradeName: 'Waterproofing',
    urgency: 'Medium' as const,
    keywords: ['waterproof', 'foundation', 'utility', 'penetration', 'detail'],
    analysis: {
      category: 'Missing Info' as const,
      urgency: 'Medium' as const,
      affectedTrades: ['Waterproofing', 'Utilities', 'Concrete'],
      responseStrategy: 'Reference detail drawings and provide step-by-step installation requirements'
    },
    response: `RE: RFI-012 - Foundation Waterproofing Detail at Utility Penetrations

Thank you for your request for clarification on the foundation waterproofing detail at utility penetrations.

REFERENCE DETAIL: Use Detail 7/A-501 - Utility Penetration Waterproofing, which shows the complete assembly.

INSTALLATION SEQUENCE:
1. Install utility sleeves with waterstop collars before concrete placement
2. Apply primary waterproofing membrane around sleeve opening
3. Install mechanical seal with hydraulic cement
4. Apply secondary membrane layer overlapping primary by minimum 6"
5. Install protective board over waterproofing system

MATERIALS:
- Waterstop: Greenstreak WS-240 or approved equal
- Hydraulic cement: Thoroseal or approved equal
- Membrane: Same as specified for main foundation waterproofing

TESTING: All penetration seals must be tested per Section 07 11 00 before backfilling.

COORDINATION: Schedule waterproofing inspection 24 hours before backfill operations begin.

Please reference the specifications in Section 07 11 00 for complete material and testing requirements. Contact the waterproofing consultant (AquaShield, Inc.) at (555) 987-6543 for any technical questions.

Best regards,
Project Management Team`,
    documentReferences: ['Detail 7/A-501 - Utility Penetrations', 'Section 07 11 00 - Waterproofing', 'AquaShield Technical Manual']
  }
];

export function findMatchingScenario(text: string, trade: string): typeof demoScenarios[0] | null {
  const lowerText = text.toLowerCase();
  const lowerTrade = trade.toLowerCase();

  for (const scenario of demoScenarios) {
    const hasKeywordMatch = scenario.keywords.some(keyword => 
      lowerText.includes(keyword.toLowerCase())
    );
    
    const hasTradeMatch = scenario.tradeName.toLowerCase().includes(lowerTrade) || 
                         lowerTrade.includes(scenario.tradeName.toLowerCase()) ||
                         scenario.tradeName === 'General Contractor';

    if (hasKeywordMatch || (hasTradeMatch && scenario.tradeName !== 'General Contractor')) {
      return scenario;
    }
  }

  // Return the first scenario as a fallback
  return demoScenarios[0];
}
import crypto from 'crypto';

// Encryption function for sensitive data
export const encryptData = (data: string, key: string): string => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

// Decryption function for sensitive data
export const decryptData = (encryptedData: string, key: string): string => {
  const textParts = encryptedData.split(':');
  const iv = Buffer.from(textParts.shift()!, 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

// Function to generate audit log entry
export const createAuditLog = (userId: string, action: string, resourceId: string): void => {
  const timestamp = new Date().toISOString();
  const logEntry = `${timestamp} - User ${userId} performed ${action} on resource ${resourceId}`;
  // In a real application, this would be saved to a secure database or log file
  console.log(logEntry);
};

// Function to validate user access based on role
export const validateAccess = (userRole: string, requiredRole: string): boolean => {
  const roleHierarchy = ['patient', 'nurse', 'doctor', 'admin'];
  const userRoleIndex = roleHierarchy.indexOf(userRole);
  const requiredRoleIndex = roleHierarchy.indexOf(requiredRole);
  return userRoleIndex >= requiredRoleIndex;
};